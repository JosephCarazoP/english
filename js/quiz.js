/* ════════════════════════════════════════════════════════
   Q U I Z   S Y S T E M
   ════════════════════════════════════════════════════════ */

let quizQuestions = [];
let quizIdx = 0;
let quizOk = 0;
let quizNo = 0;
let quizLocked = false;
let quizFailedSet = new Set(); // verbos fallados pendientes de dominar
let quizPracticeMode = false;     // true cuando repasamos los fallados
let quizOriginalTotal = 0;         // total del quiz original (para el resumen)

/* ── Tense helpers ── */
function pickQuizTense() {
  return Math.random() < 0.5 ? "present" : "past";
}

function getTenseName(tense) {
  return tense === "present" ? "present tense" : "past tense";
}

function getTenseHintEs(tense) {
  return tense === "present" ? "presente" : "pasado";
}

function getOppositeTense(tense) {
  return tense === "present" ? "past" : "present";
}

function getVerbForm(verb, tense) {
  return tense === "present" ? verb.present : verb.past;
}

function normalizeQuizAnswer(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,!?;:¿¡"'`]/g, "")
    .replace(/[“”‘’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getPastTargets(verb) {
  return String(verb.past || "")
    .toLowerCase()
    .split("/")
    .map(s => normalizeQuizAnswer(s))
    .filter(Boolean);
}

function getTenseTargets(verb, tense) {
  if (tense === "present") return [normalizeQuizAnswer(verb.present)].filter(Boolean);
  return getPastTargets(verb);
}

function getSpanishTenseName(tense) {
  return tense === "present" ? "presente" : "pasado";
}

const QUIZ_SENTENCE_TRANSLATIONS_ES = {
  bear: { present: "Algunas personas no pueden soportar el clima frío.", past: "Ella soportó el dolor con gran valentía." },
  buy: { present: "Compro verduras frescas todas las mañanas.", past: "Ayer compré un regalo para mi madre." },
  drive: { present: "Por favor, conduce despacio cerca de la escuela.", past: "Él condujo toda la noche para llegar a la playa." },
  eat: { present: "Siempre desayuno a las 7:00 a. m.", past: "Comimos una pizza deliciosa anoche." },
  find: { present: "Es difícil encontrar un lugar para estacionar aquí.", past: "Encontré mis llaves perdidas debajo del sofá." },
  grow: { present: "Las plantas crecen más rápido con suficiente luz solar.", past: "La ciudad creció rápidamente en la última década." },
  have: { present: "Tengo dos hermanos y una hermana.", past: "La pasamos muy bien en la fiesta." },
  know: { present: "Sé la respuesta a tu pregunta.", past: "Sabía que me ibas a llamar." },
  lose: { present: "No pierdas tu pasaporte en el aeropuerto.", past: "Nuestro equipo perdió el partido por un gol." },
  meet: { present: "Quiero conocer a tus nuevos amigos.", past: "Nos conocimos por primera vez en la secundaria." },
  read: { present: "Debes leer las instrucciones con cuidado.", past: "Anoche leí un artículo muy largo." },
  speak: { present: "¿Puedes hablar más despacio, por favor?", past: "Él habló con el gerente sobre el problema." },
  swim: { present: "Nado en la piscina todos los sábados.", past: "Nadamos en el océano durante nuestras vacaciones." },
  take: { present: "Recuerda llevar tu paraguas contigo.", past: "Ella tomó el autobús para ir al centro de la ciudad." },
  write: { present: "Escribo en mi diario todas las tardes.", past: "Él escribió un hermoso poema para su esposa." },
  visit: { present: "Me gusta visitar museos los fines de semana.", past: "Ellos visitaron muchos países el año pasado." },
  paint: { present: "Ella quiere pintar su habitación de azul.", past: "Él pintó un hermoso paisaje ayer." },
  cook: { present: "A menudo cocino la cena para mi familia.", past: "Él cocinó una comida especial para su cumpleaños." },
  talk: { present: "Necesitamos hablar sobre el nuevo proyecto.", past: "Hablé con el profesor después de la clase." },
  walk: { present: "Camino al trabajo cuando hace buen tiempo.", past: "Caminamos tres millas en el parque." },
  work: { present: "Ellos trabajan en una oficina muy grande.", past: "Ella trabajó hasta tarde el viernes pasado." },
  watch: { present: "¿Quieres ver una película esta noche?", past: "Vimos el partido de fútbol en la televisión." },
  laugh: { present: "Las películas divertidas me hacen reír mucho.", past: "Ella se rió del chiste que le conté." },
  listen: { present: "Escucho música mientras estudio.", past: "Él escuchó atentamente las instrucciones." },
  play: { present: "Los niños juegan en el jardín todos los días.", past: "Jugamos fútbol durante dos horas ayer." },
  call: { present: "Te llamaré tan pronto como llegue.", past: "Ella llamó a su madre esta mañana." },
  arise: { present: "Surgen nuevos problemas todos los días.", past: "Surgió un gran conflicto durante la reunión." },
  awake: { present: "Normalmente despierto cuando sale el sol.", past: "Él despertó de repente en medio de la noche." },
  be: { present: "Por favor, sé paciente con los nuevos estudiantes.", past: "Estaba muy feliz de verte ayer." },
  beat: { present: "¿Puedes superar la puntuación más alta en este juego?", past: "Ellos vencieron al equipo rival el sábado pasado." },
  become: { present: "Es difícil convertirse en médico profesional.", past: "Él se convirtió en un cantante famoso en poco tiempo." },
  begin: { present: "Las clases comienzan a las ocho de la mañana.", past: "Empezó a llover justo después de que salimos de casa." },
  bend: { present: "Ten cuidado de no doblar la tarjeta de crédito.", past: "Él dobló el tubo de metal con las manos." },
  bet: { present: "Apuesto a que no puedes terminar esa hamburguesa enorme.", past: "Él apostó todo su dinero y lo perdió todo." },
  bite: { present: "¡Ten cuidado! Ese perro podría morderte.", past: "Un mosquito me picó en el brazo anoche." },
  blow: { present: "A los niños les encanta soplar burbujas de jabón.", past: "Un viento fuerte sopló las hojas." },
  break: { present: "Si rompes las reglas, serás castigado.", past: "El vaso se rompió en mil pedazos." },
  bring: { present: "Siempre trae tu cuaderno a la clase.", past: "Ella trajo unas galletas para la fiesta." },
  choose: { present: "Debes elegir la respuesta correcta ahora.", past: "Elegí la camisa roja en lugar de la azul." },
  come: { present: "Por favor, ven a mi casa esta tarde.", past: "Ellos regresaron de su viaje ayer." },
  cut: { present: "Usa estas tijeras para cortar el papel.", past: "Él cortó el pastel en ocho partes iguales." },
  do: { present: "Necesito hacer mi tarea esta noche.", past: "Hiciste un muy buen trabajo en el proyecto." },
  drink: { present: "Deberías beber ocho vasos de agua.", past: "Él bebió una soda fría después de la carrera." },
  fall: { present: "Ten cuidado o te caerás en el hielo.", past: "Las hojas cayeron de los árboles en otoño." },
  forget: { present: "A menudo olvido dónde pongo mis lentes.", past: "Olvidé comprar leche en el supermercado." },
  get: { present: "Necesito conseguir un par de zapatos nuevos.", past: "Ella obtuvo una calificación perfecta en su examen." },
  give: { present: "Por favor, dame una mano con esta caja.", past: "Mi padre me dio este reloj para mi cumpleaños." },
  go: { present: "Voy al gimnasio cuatro veces por semana.", past: "Fuimos al cine el domingo pasado." },
  make: { present: "Me gusta hacer mi propia ropa.", past: "Ella hizo un delicioso pastel de chocolate." },
  see: { present: "Puedo ver las montañas desde mi ventana.", past: "Vi a un actor famoso en el aeropuerto." },
  sing: { present: "Ella puede cantar notas muy altas hermosamente.", past: "Cantamos feliz cumpleaños a nuestro amigo." },
  sleep: { present: "Necesito dormir al menos siete horas.", past: "El bebé durmió tranquilamente toda la noche." },
  think: { present: "Creo que va a llover hoy.", past: "Pensé que estabas en la oficina." },
  win: { present: "Queremos ganar el campeonato este año.", past: "Ellos ganaron la lotería hace dos años." },
  accept: { present: "¿Aceptan tarjetas de crédito aquí?", past: "Ella aceptó la oferta de trabajo inmediatamente." },
  count: { present: "¿Puedes contar del uno al veinte?", past: "Él contó el dinero dos veces para estar seguro." },
  need: { present: "Necesito ayuda con mi tarea.", past: "Necesitábamos un carro más grande para el viaje." },
  start: { present: "La película comenzará en cinco minutos.", past: "Empezó a nevar temprano esta mañana." },
  want: { present: "Quiero viajar por todo el mundo.", past: "Él quería comprar una computadora nueva." },
  ask: { present: "No tengas miedo de hacer preguntas.", past: "Le pregunté a la policía por direcciones." },
  dance: { present: "Ellos bailan salsa muy bien juntos.", past: "Bailamos toda la noche en la boda." },
  finish: { present: "Debo terminar este informe para el viernes.", past: "Ella terminó su cena muy rápido." },
  help: { present: "Me alegra ayudarte con eso.", past: "Él me ayudó a cargar las bolsas pesadas." },
  look: { present: "Por favor, mira la pizarra ahora.", past: "Busqué mis llaves por todas partes." },
  answer: { present: "Siempre respondo mis correos rápidamente.", past: "Él respondió todas las preguntas correctamente." },
  clean: { present: "Limpio mi habitación todos los sábados.", past: "Limpiamos toda la casa ayer." },
  love: { present: "Amo pasar tiempo con mi familia.", past: "A ella le encantaba esa película cuando era niña." },
  open: { present: "¿Podrías abrir la ventana, por favor?", past: "Él abrió la puerta para la señora." },
  stay: { present: "Normalmente me quedo en casa los domingos.", past: "Ellos se quedaron en un hotel muy bonito." },
  bid: { present: "Los inversionistas pujan por pinturas raras.", past: "Ella ofreció diez dólares por el libro viejo." },
  bind: { present: "Reglas estrictas unen a todos los miembros del club.", past: "Él ató los papeles con una cuerda." },
  bleed: { present: "Los cortes profundos suelen sangrar durante varios minutos.", past: "Le sangró la nariz después de la caída." },
  breed: { present: "Ellos crían perros en una pequeña granja.", past: "El granjero crió caballos durante muchos años." },
  broadcast: { present: "Las estaciones locales transmiten las noticias cada hora.", past: "Ellos transmitieron el partido en vivo anoche." },
  build: { present: "Los ingenieros construyen puentes sobre el río.", past: "Ellos construyeron una nueva escuela en el pueblo." },
  burn: { present: "Ten cuidado, las sartenes calientes pueden quemarte la piel.", past: "Ella quemó la tostada esta mañana." },
  burst: { present: "Los globos estallan cuando los presionas demasiado.", past: "La tubería reventó durante la noche fría." },
  cast: { present: "Los pescadores lanzan sus redes al amanecer.", past: "Él lanzó la línea al lago profundo." },
  catch: { present: "Los porteros deben atrapar la pelota con ambas manos.", past: "Ella alcanzó el autobús justo a tiempo." },
  cling: { present: "Las hojas mojadas se pegan al parabrisas.", past: "El niño se aferró a la mano de su madre." },
  cost: { present: "Los buenos zapatos cuestan mucho dinero.", past: "La reparación costó más de lo que esperaba." },
  creep: { present: "Los gatos suelen deslizarse silenciosamente por el suelo.", past: "Él entró sigilosamente en la habitación sin hacer ruido." },
  deal: { present: "Los buenos líderes tratan los problemas con calma.", past: "Ella repartió las cartas a todos los jugadores." },
  dig: { present: "A los perros les encanta cavar hoyos en el jardín.", past: "Cavamos un hoyo profundo para el nuevo árbol." },
  draw: { present: "Los niños dibujan imágenes de su familia.", past: "Él dibujó un hermoso retrato de ella." },
  dream: { present: "A menudo sueño con volar sobre el mar.", past: "Ella soñó con convertirse en una artista famosa." },
  feed: { present: "Los padres alimentan a sus bebés varias veces al día.", past: "Alimentamos a los patos en el parque." },
  feel: { present: "Me siento feliz cuando veo a mis amigos.", past: "Él se sintió muy cansado después del largo viaje." },
  fight: { present: "Los soldados luchan para proteger su país.", past: "Ellos lucharon valientemente hasta el final." },
  flee: { present: "Los animales huyen cuando sienten peligro.", past: "Los ladrones huyeron de la policía." },
  fly: { present: "Las aves vuelan hacia el sur cada invierno.", past: "Volamos a París para nuestro aniversario." },
  forbid: { present: "Algunas escuelas prohíben el uso de teléfonos en clase.", past: "Sus padres le prohibieron salir tarde." },
  forgive: { present: "Los buenos amigos perdonan los errores pequeños.", past: "Ella lo perdonó por llegar tan tarde." },
  freeze: { present: "El agua puede congelarse a cero grados.", past: "El lago se congeló por completo el invierno pasado." },
  grind: { present: "Las cafeterías muelen granos todas las mañanas.", past: "Él molió la pimienta sobre la ensalada." },
  hang: { present: "Normalmente colgamos nuestros abrigos junto a la puerta.", past: "Ella colgó los cuadros en la pared." },
  hear: { present: "Puedo oír a los pájaros cantando afuera.", past: "Oímos un ruido extraño a medianoche." },
  hide: { present: "A los niños les encanta esconderse detrás de las cortinas.", past: "Él escondió el regalo en el armario." },
  hit: { present: "No golpees a tu hermana, por favor.", past: "La pelota golpeó la ventana muy fuerte." },
  hold: { present: "Los padres sostienen las manos de sus hijos en la calle.", past: "Ella sostuvo al bebé en sus brazos." },
  hurt: { present: "Los zapatos ajustados pueden lastimarte los pies.", past: "Él se lastimó la rodilla jugando fútbol." },
  keep: { present: "Los buenos estudiantes mantienen sus apuntes organizados.", past: "Ella guardó el secreto durante muchos años." },
  kneel: { present: "Muchas personas se arrodillan cuando rezan.", past: "Él se arrodilló para atarse el zapato." },
  knit: { present: "A mi abuela le encanta tejer suéteres cálidos.", past: "Ella tejió una hermosa bufanda para mí." },
  lay: { present: "Las gallinas ponen huevos casi todos los días.", past: "Él puso el libro sobre la mesa." },
  lead: { present: "Los buenos capitanes lideran a su equipo con respeto.", past: "Ella guió al grupo por el bosque." },
  lean: { present: "No te apoyes en la cerca nueva.", past: "Él se apoyó contra la pared para descansar." },
  leap: { present: "Las ranas saltan de una roca a otra.", past: "Ella saltó sobre el pequeño charco." },
  learn: { present: "Los bebés aprenden a caminar alrededor de su primer año.", past: "Aprendí mucho durante mi viaje." },
  leave: { present: "Los trabajadores normalmente salen de la oficina a las cinco.", past: "Salimos de la fiesta muy temprano." },
  lend: { present: "Los buenos amigos dan una mano cuando se necesita.", past: "Él me prestó su carro durante el fin de semana." },
  let: { present: "Por favor, avísame si necesitas ayuda.", past: "Ella dejó que el perro entrara a la casa." },
  lie: { present: "A los gatos les encanta echarse al sol durante horas.", past: "Él se acostó en el sofá toda la tarde." },
  light: { present: "Por favor, enciende las velas antes de la cena.", past: "Ella encendió la chimenea anoche." },
  mean: { present: "Las palabras pueden significar cosas diferentes según el contexto.", past: "Quería llamarte ayer." },
  mistake: { present: "A veces la gente me confunde con mi hermano.", past: "La confundí con una vieja amiga." },
  overcome: { present: "Las personas valientes superan sus miedos todos los días.", past: "Ella superó muchos problemas en su vida." },
  pay: { present: "Los clientes pagan en la caja al salir.", past: "Él pagó la cuenta con una tarjeta de crédito." },
  put: { present: "Por favor, pon los libros en el estante.", past: "Ella puso las llaves en su bolso." },
  ride: { present: "Muchos niños montan bicicleta para ir a la escuela.", past: "Montamos caballos en la playa ayer." },
  ring: { present: "Las campanas de la iglesia suenan todos los domingos por la mañana.", past: "El teléfono sonó tres veces anoche." },
  rise: { present: "El sol sale por el este cada día.", past: "Los precios subieron bruscamente el mes pasado." },
  run: { present: "Los atletas corren todas las mañanas antes del trabajo.", past: "Corrí cinco kilómetros esta mañana." },
  say: { present: "Por favor, di la palabra muy claramente.", past: "Ella dijo adiós y salió de la habitación." },
  seek: { present: "Los investigadores buscan respuestas a preguntas difíciles.", past: "Él buscó ayuda de su profesor." },
  sell: { present: "Las panaderías venden pan fresco todas las mañanas.", past: "Vendimos nuestro carro viejo la semana pasada." },
  send: { present: "Las empresas envían correos a sus clientes.", past: "Ella envió una postal desde Italia." },
  set: { present: "Por favor, pon la mesa antes de la cena.", past: "Él puso la alarma para las seis de la mañana." },
  sew: { present: "Los sastres cosen hermosos trajes a mano.", past: "Ella cosió un botón en mi chaqueta." },
  shake: { present: "Siempre agita la botella antes de abrirla.", past: "Él me estrechó la mano con una gran sonrisa." },
  shine: { present: "Las estrellas brillan intensamente en el cielo del campo.", past: "El sol brilló toda la tarde ayer." },
  shoot: { present: "Los fotógrafos toman cientos de fotos.", past: "Él lanzó el balón a la portería." },
  show: { present: "Los profesores muestran ejemplos en la pizarra.", past: "Ella nos mostró su nueva casa." },
  shrink: { present: "Los suéteres de lana suelen encogerse en agua caliente.", past: "Mi camiseta se encogió después de una lavada." },
  shut: { present: "Por favor, cierra la puerta cuando te vayas.", past: "Ella cerró los ojos y pidió un deseo." },
  sink: { present: "Las piedras pesadas se hunden rápidamente en el agua.", past: "El barco se hundió durante la tormenta." },
  sit: { present: "Por favor, siéntate y relájate un rato.", past: "Nos sentamos juntos durante la película." },
  slide: { present: "A los niños les encanta deslizarse en el parque infantil.", past: "Él se resbaló en la acera helada." },
  smell: { present: "Los perros pueden oler cosas desde lejos.", past: "La cocina olía a pan fresco." },
  sow: { present: "Los agricultores siembran semillas a principios de primavera.", past: "Sembramos semillas de tomate el fin de semana pasado." },
  speed: { present: "Los carros suelen correr demasiado en esta carretera vacía.", past: "Él pasó a toda velocidad por el semáforo amarillo." },
  spell: { present: "¿Puedes deletrear tu apellido, por favor?", past: "Ella deletreó cada palabra correctamente." },
  spend: { present: "Normalmente paso mis fines de semana en casa.", past: "Gastamos demasiado dinero en la cena." },
  spill: { present: "Ten cuidado, podrías derramar el café.", past: "Él derramó jugo en la alfombra nueva." },
  spin: { present: "Los trompos pueden girar durante mucho tiempo.", past: "Ella hizo girar la rueda con todas sus fuerzas." },
  spit: { present: "Por favor, no escupas en la acera.", past: "El bebé escupió la medicina." },
  split: { present: "Los amigos suelen dividir la cuenta en los restaurantes.", past: "Dividimos el pastel en ocho pedazos." },
  spoil: { present: "No arruines la sorpresa para los niños.", past: "El mal tiempo arruinó nuestros planes de picnic." },
  spread: { present: "Las noticias pueden difundirse muy rápido en línea.", past: "Ella untó mantequilla en la tostada." },
  spring: { present: "Los gatos saltan cuando ven un ratón.", past: "Él saltó de la cama al sonar la alarma." },
  stand: { present: "Los soldados se mantienen firmes durante el desfile.", past: "Estuvimos de pie en la fila durante una hora." },
  steal: { present: "Los ladrones a veces roban a los turistas.", past: "Alguien robó mi billetera en la estación." },
  stick: { present: "El pegamento ayuda a pegar papel.", past: "La nota se quedó pegada al refrigerador durante semanas." },
  sting: { present: "Las abejas pueden picar cuando se sienten amenazadas.", past: "Una abeja me picó en el brazo." },
  stink: { present: "Los calcetines viejos suelen apestar después de un día largo.", past: "La basura apestó todo el fin de semana." },
  stride: { present: "Las personas seguras caminan con paso firme por la calle.", past: "Él entró en la habitación con paso decidido." },
  strike: { present: "Un rayo puede caer en el mismo lugar dos veces.", past: "El reloj dio la medianoche con fuerza." },
  swear: { present: "Los testigos juran decir la verdad.", past: "Él juró que nunca volvería a mentir." },
  sweat: { present: "Los atletas sudan durante los entrenamientos intensos.", past: "Sudé mucho en la clase de ayer." },
  sweep: { present: "Por favor, barre el piso después del almuerzo.", past: "Ella barrió las hojas del porche." },
  swell: { present: "Los tobillos suelen hincharse después de un vuelo largo.", past: "Su rodilla se hinchó después de la caída." },
  swing: { present: "A los niños les encanta columpiarse en el parque.", past: "Él balanceó el bate y golpeó la pelota." },
  teach: { present: "Los buenos profesores enseñan con paciencia.", past: "Mi padre me enseñó a conducir." },
  tear: { present: "Ten cuidado, el papel puede rasgarse fácilmente.", past: "Ella rompió la carta en pedazos." },
  tell: { present: "Por favor, dime la verdad ahora mismo.", past: "Él contó una historia graciosa en la cena." },
  throw: { present: "Los mariscales lanzan la pelota con fuerza.", past: "Ella lanzó las llaves al otro lado de la habitación." },
  thrust: { present: "Los boxeadores empujan sus puños con fuerza.", past: "Él empujó la puerta para abrirla con prisa." },
  tread: { present: "Los excursionistas pisan con cuidado las rocas mojadas.", past: "Accidentalmente pisé su pie." },
  understand: { present: "Los buenos oyentes entienden a las personas rápidamente.", past: "Finalmente entendí el problema de matemáticas." },
  undergo: { present: "Los pacientes a veces se someten a cirugías largas.", past: "Él se sometió a una operación difícil." },
  undertake: { present: "Los equipos valientes emprenden proyectos difíciles.", past: "Ella emprendió un gran proyecto de investigación." },
  wake: { present: "Normalmente me despierto antes del amanecer.", past: "Él se despertó tarde esta mañana." },
  wear: { present: "Los pilotos usan uniformes durante los vuelos.", past: "Ella llevó un vestido rojo a la fiesta." },
  weave: { present: "Los artesanos expertos tejen hermosas canastas.", past: "Ella tejió una manta colorida a mano." },
  weep: { present: "Las personas a veces lloran con películas tristes.", past: "Ella lloró cuando escuchó la noticia." },
  wet: { present: "No mojes los libros, por favor.", past: "La lluvia mojó toda nuestra ropa." },
  wind: { present: "Los relojes antiguos se dan cuerda con una pequeña llave.", past: "El camino serpenteaba por las montañas." },
  withdraw: { present: "La gente retira efectivo de los cajeros automáticos todos los días.", past: "Él retiró cien dólares ayer." },
  wring: { present: "Por favor, escurre la toalla antes de colgarla.", past: "Ella escurrió la camisa mojada sobre el fregadero." },
  date: { present: "Muchas parejas salen durante años antes de casarse.", past: "Ellos salieron durante dos años en la universidad." },
  end: { present: "Todas las cosas buenas terminan en algún momento.", past: "La clase terminó hace diez minutos." },
  expect: { present: "Los padres esperan lo mejor de sus hijos.", past: "Esperábamos una multitud mucho más grande." },
  intend: { present: "Tengo la intención de estudiar más este año.", past: "Él tenía la intención de llamarte ayer." },
  plant: { present: "Los jardineros plantan flores cada primavera.", past: "Plantamos un árbol en el patio trasero." },
  point: { present: "No señales a las personas, es grosero.", past: "Ella señaló la respuesta perfecta." },
  rent: { present: "Muchos estudiantes alquilan apartamentos pequeños.", past: "Alquilamos una cabaña cerca del lago." },
  repeat: { present: "¿Podrías repetir la pregunta, por favor?", past: "Él repitió el mismo chiste tres veces." },
  resist: { present: "Es difícil resistirse al pastel de chocolate.", past: "Ella resistió la tentación de renunciar." },
  wait: { present: "Por favor, espera en la fila con paciencia.", past: "Esperamos dos horas en el aeropuerto." },
  dress: { present: "Me visto bien para las reuniones importantes.", past: "Ella se vistió elegante para la boda." },
  erase: { present: "Por favor, borra la pizarra después de clase.", past: "Él borró el archivo por error." },
  jump: { present: "Los canguros saltan muy lejos de un solo brinco.", past: "El gato saltó sobre la mesa." },
  like: { present: "A la mayoría de los niños les gusta el helado de chocolate.", past: "A ella le gustó el regalo que le di." },
  miss: { present: "Siempre extraño a mi familia durante los viajes largos.", past: "Él perdió el autobús esta mañana." },
  practice: { present: "Los atletas practican casi todos los días.", past: "Ella practicó piano durante dos horas." },
  push: { present: "Por favor, empuja la puerta, no la jales.", past: "Él empujó el carrito cuesta arriba." },
  shop: { present: "Normalmente vamos de compras los sábados por la mañana.", past: "Ellos compraron durante horas en el centro comercial." },
  smoke: { present: "Por favor, no fumes dentro del edificio.", past: "Él fumó durante muchos años antes de dejarlo." },
  stop: { present: "Los conductores deben detenerse en cada luz roja.", past: "La lluvia finalmente se detuvo al mediodía." },
  use: { present: "La mayoría de las personas usan sus teléfonos todos los días.", past: "Él usó mi computadora ayer." },
  wash: { present: "Me lavo las manos antes de cada comida.", past: "Ella lavó los platos después de la cena." },
  wish: { present: "Los niños piden juguetes nuevos en Navidad.", past: "Ella me deseó buena suerte en el examen." },
  arrive: { present: "Los trenes normalmente llegan justo a tiempo.", past: "Llegamos al hotel muy tarde." },
  belong: { present: "Estos libros pertenecen a la biblioteca.", past: "Ese bolso pertenecía a mi abuela." },
  change: { present: "Los planes suelen cambiar en el último minuto.", past: "Él cambió de opinión sobre el viaje." },
  climb: { present: "Los monos pueden trepar árboles muy rápido.", past: "Subimos la montaña el verano pasado." },
  close: { present: "Por favor, cierra la ventana, hace frío.", past: "La tienda cerró temprano anoche." },
  consider: { present: "La considero mi mejor amiga.", past: "Él consideró mudarse a otra ciudad." },
  dare: { present: "Pocas personas se atreven a hablar en las reuniones.", past: "Ella se atrevió a saltar desde el trampolín alto." },
  deliver: { present: "Los carteros entregan cartas todos los días.", past: "Ellos entregaron el paquete esta mañana." },
  enjoy: { present: "Disfruto mucho las caminatas largas en el parque.", past: "Disfrutamos mucho el concierto." },
  fill: { present: "Por favor, llena la botella con agua fría.", past: "Él llenó el formulario con sus datos." },
  follow: { present: "Los conductores deben seguir las reglas de tránsito.", past: "Ella me siguió hasta el estacionamiento." },
  hurry: { present: "Por favor, apúrate o perderemos el autobús.", past: "Él se apresuró para terminar el informe." },
  live: { present: "Muchos artistas viven en estudios pequeños.", past: "Ella vivió en París durante cinco años." },
  name: { present: "Los padres nombran a sus bebés con cuidado.", past: "Ellos llamaron Max al perro." },
  order: { present: "Los clientes piden comida en la aplicación.", past: "Él pidió una pizza para la cena." },
  plan: { present: "Siempre planeamos nuestras vacaciones con cuidado.", past: "Ellos planearon una fiesta sorpresa para él." },
  rain: { present: "Normalmente llueve mucho en abril.", past: "Llovió durante todo el fin de semana." },
  remember: { present: "Siempre recuerdo los cumpleaños de mis amigos.", past: "Ella recordó cerrar la puerta con llave." },
  study: { present: "Los buenos estudiantes estudian un poco todos los días.", past: "Él estudió toda la noche para el examen." },
  travel: { present: "Muchos jóvenes viajan después de la universidad.", past: "Viajamos por Europa el verano pasado." },
  try: { present: "Por favor, haz tu mejor esfuerzo en el examen.", past: "Ella probó una receta nueva para la cena." },
  turn: { present: "Los carros deben girar a la derecha en la próxima esquina.", past: "Él apagó las luces antes de acostarse." },
};

/* ── Get distractors ── */
function getDistractor(correctVerb, pool, tense) {
  const correctTargets = new Set(getTenseTargets(correctVerb, tense));
  const choices = pool.filter(v => !getTenseTargets(v, tense).some(target => correctTargets.has(target)));
  return getVerbForm(shuffle(choices)[0] || correctVerb, tense);
}
function getDistractors(correctVerb, pool, tense) {
  const correctTargets = new Set(getTenseTargets(correctVerb, tense));
  return shuffle(pool.filter(v => !getTenseTargets(v, tense).some(target => correctTargets.has(target))))
    .slice(0, 3)
    .map(v => getVerbForm(v, tense));
}

function buildSentencePrompt(verb, tense) {
  const html = tense === "present" ? (verb.sentencePres || "") : (verb.sentencePast || "");
  let answer = "";
  let promptHtml = html.replace(/<b>(.*?)<\/b>/i, (_, raw) => {
    answer = stripHtml(raw);
    return '<span class="qsent-blank" aria-hidden="true"></span>';
  });

  if (!answer) {
    answer = String(getVerbForm(verb, tense) || "").split("/")[0].trim();
    promptHtml = stripHtml(html).replace(answer, "________");
  }

  const meaning = VERB_MEANINGS_ES[verb.present] || verb.present;
  const formTargets = tense === "past" ? getTenseTargets(verb, tense) : [];
  const targets = Array.from(new Set([normalizeQuizAnswer(answer), ...formTargets])).filter(Boolean);
  return { promptHtml, answer, targets, hint: `${meaning} en ${getTenseHintEs(tense)}` };
}

function buildTranslationPrompt(verb, tense) {
  const direction = Math.random() < 0.5 ? "es-en" : "en-es";
  const tenseName = getTenseName(tense);
  const spanishTense = getSpanishTenseName(tense);
  const englishSentence = stripHtml(tense === "present" ? verb.sentencePres : verb.sentencePast);
  const spanishSentence = QUIZ_SENTENCE_TRANSLATIONS_ES[verb.present]?.[tense] || "";

  if (direction === "es-en") {
    const targets = [normalizeQuizAnswer(englishSentence)].filter(Boolean);
    return {
      direction,
      source: spanishSentence,
      answer: englishSentence,
      targets,
      hint: `Traduce al inglés. Tiempo: ${tenseName}.`,
    };
  }

  const targets = [normalizeQuizAnswer(spanishSentence)].filter(Boolean);
  return {
    direction,
    source: englishSentence,
    answer: spanishSentence,
    targets,
    hint: `Translate to Spanish. Tiempo: ${spanishTense}.`,
  };
}

/* ── Build question ── */
function buildQuestion(verb, pool) {
  const mechs = ["swipe", "type", "sentence", "choice", "translate"];
  const mech = mechs[Math.floor(Math.random() * mechs.length)];
  const tense = pickQuizTense();
  const sourceTense = getOppositeTense(tense);
  const source = getVerbForm(verb, sourceTense);
  const answer = getVerbForm(verb, tense);
  const tenseName = getTenseName(tense);
  if (mech === "swipe") {
    const distractor = getDistractor(verb, pool, tense);
    const correctOnRight = Math.random() > 0.5;
    return {
      mech: "swipe", label: `Swipe to the ${tenseName}`, verb, tense, source,
      leftOpt: correctOnRight ? distractor : answer,
      rightOpt: correctOnRight ? answer : distractor,
      correctSide: correctOnRight ? "right" : "left",
    };
  }
  if (mech === "type") {
    return { mech: "type", label: `Type the ${tenseName}`, verb, tense, source, answer };
  }
  if (mech === "sentence") {
    return { mech: "sentence", label: `Complete the ${tenseName} sentence`, verb, tense, sentence: buildSentencePrompt(verb, tense) };
  }
  if (mech === "translate") {
    const translation = buildTranslationPrompt(verb, tense);
    const label = translation.direction === "es-en"
      ? `Traduce al inglés (${tenseName})`
      : `Translate to Spanish (${getSpanishTenseName(tense)})`;
    return { mech: "translate", label, verb, tense, translation };
  }
  const opts = shuffle([answer, ...getDistractors(verb, pool, tense)]);
  return { mech: "choice", label: `Pop the ${tenseName}`, opts, correct: answer, verb, tense, source };
}

function buildQuiz(verbPool) {
  return shuffle(verbPool).map(v => buildQuestion(v, verbPool));
}

/* ── Start quiz ── */
function startQuiz() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  document.body.classList.remove("is-card-review", "is-quiz-review");

  updateDeck();
  const s = loadVFCSettings();
  const mode = s.verbMode || "all";

  const fullPool = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);

  const QUIZ_CAP = 30;
  let verbPool;
  if (mode === "all") {
    verbPool = shuffle(fullPool).slice(0, QUIZ_CAP);
  } else {
    verbPool = fullPool;
  }

  quizQuestions = buildQuiz(verbPool);
  quizIdx = 0;
  quizOk = 0;
  quizNo = 0;
  quizLocked = false;
  quizFailedSet = new Set();
  quizPracticeMode = false;
  quizOriginalTotal = quizQuestions.length;
  showQuizPracticePill(false);

  document.querySelector(".score-correct .score-lbl").textContent = "Correct";
  document.querySelector(".score-skip    .score-lbl").textContent = "Wrong";
  document.getElementById("scoreCorrect").textContent = "0";
  document.getElementById("scoreSkip").textContent = "0";

  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "none";

  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");

  const qStackCards = document.getElementById("qStackCards");
  if (qStackCards) qStackCards.classList.remove("results-mode");

  setTimeout(() => {
    const qs = document.getElementById("quizScreen");
    qs.style.display = "flex";
    renderQuizQuestion();
  }, 50);
}

/* ── Update header ── */
function updateQuizHeader() {
  const total = quizQuestions.length;
  const pct = Math.round((quizIdx / total) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${Math.min(quizIdx + 1, total)} / ${total}`;
  document.getElementById("scoreCorrect").textContent = quizOk;
  document.getElementById("scoreSkip").textContent = quizNo;
  if (quizPracticeMode) {
    const cnt = document.getElementById("quizPracticeCount");
    if (cnt) cnt.textContent = quizFailedSet.size;
  }
}

/* ── Avanzar a la siguiente pregunta con animación de salida ── */
function animateToNextQuestion(flyDirection, delay) {
  const c1 = document.getElementById("qCard1");
  const wait = delay !== undefined ? delay : 700;

  setTimeout(() => {
    c1.style.transition = "none";
    const flyClass = flyDirection === "right" ? "anim-exit-right"
      : flyDirection === "left" ? "anim-exit-left"
        : "anim-exit-up";

    c1.classList.add(flyClass);

    promoteBackCards();

    setTimeout(() => {
      quizIdx++;
      renderQuizQuestion(true);
    }, 280);
  }, wait);
}

/* ── Promover c2 → top y c3 → c2 con animación suave ── */
function promoteBackCards() {
  const c2 = document.getElementById("qCard2");
  const c3 = document.getElementById("qCard3");

  if (c2) {
    c2.style.transform = "translateY(0) scale(1)";
    c2.style.opacity = "1";
  }
  if (c3) {
    c3.style.transform = "translateY(7px) scale(0.96)";
    c3.style.opacity = "1";
  }
}

/* ── Quiz label configs ── */
const QUIZ_LABELS = {
  swipe: {
    icon: "👈👉",
    text: "Swipe to the requested tense",
    color: "var(--accent-2)",
    bg: "var(--accent-2-soft)",
  },
  type: {
    icon: "⌨️",
    text: "Type the requested tense &amp; press Enter",
    color: "var(--accent-3)",
    bg: "var(--accent-3-soft)",
  },
  choice: {
    icon: "🫧",
    text: "Pop the correct bubble!",
    color: "var(--accent)",
    bg: "var(--accent-soft)",
  },
  sentence: {
    icon: "T",
    text: "Complete the sentence",
    color: "var(--accent)",
    bg: "var(--accent-soft)",
  },
  translate: {
    icon: "⇄",
    text: "Translate the sentence",
    color: "var(--accent-3)",
    bg: "var(--accent-3-soft)",
  },
};

/* ── Render current quiz question ── */
function renderQuizQuestion(animateIn = false) {
  if (quizIdx >= quizQuestions.length) {
    if (quizFailedSet.size > 0) {
      startQuizPracticeRound();
      return;
    }
    showQuizPracticePill(false);
    showQuizResults();
    return;
  }

  quizLocked = false;
  const q = quizQuestions[quizIdx];
  const c1 = document.getElementById("qCard1");

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.remove("results-mode");

  c1.style.cssText = "";
  c1.className = "quiz-card top";
  if (q.mech !== "swipe") c1.classList.add("no-drag");
  if (animateIn) {
    void c1.offsetWidth;
    c1.classList.add("anim-enter");
    c1.addEventListener("animationend", () => c1.classList.remove("anim-enter"), { once: true });
  }

  const c2 = document.getElementById("qCard2");
  const c3 = document.getElementById("qCard3");
  if (c2) { c2.style.cssText = ""; c2.className = "quiz-card c2"; }
  if (c3) { c3.style.cssText = ""; c3.className = "quiz-card c3"; }

  hideSwipeGhosts();

  const dirRow = document.getElementById("qDirRow");
  const body = document.getElementById("qBody");

  /* ── Render the label pill ── */
  const lbl = QUIZ_LABELS[q.mech];
  document.getElementById("qLabel").innerHTML =
    `<span class="qlabel-pill" style="background:${lbl.bg};color:${lbl.color};">` +
    `<span class="qlabel-icon">${lbl.icon}</span>` +
    `<span class="qlabel-text">${q.label || lbl.text}</span>` +
    `</span>`;

  if (q.mech === "swipe") {
    dirRow.style.display = "flex";
    body.innerHTML =
      `<div class="qsw-verb">${q.source}</div>` +
      `<div class="qsw-sub">${getTenseName(q.tense)}</div>` +
      `<div class="qsw-opts">` +
      `<div class="qsw-opt" id="qOptL">${q.leftOpt}</div>` +
      `<div class="qsw-or">or</div>` +
      `<div class="qsw-opt" id="qOptR">${q.rightOpt}</div>` +
      `</div>`;

  } else if (q.mech === "type") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qtype-verb">${q.source}</div>` +
      `<div class="qtype-wrap">` +
      `<div class="qtype-tip">Write the ${getTenseName(q.tense)} below</div>` +
      `<input id="qTypeInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${getTenseName(q.tense)}..." />` +
      `<div class="qtype-fb" id="qTypeFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTypeInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const targets = getTenseTargets(q.verb, q.tense);
      const isOk = targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTypeFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 820);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else if (q.mech === "sentence") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qsent-wrap">` +
      `<div class="qsent-text">${q.sentence.promptHtml}</div>` +
      `<div class="qsent-hint">(${q.sentence.hint})</div>` +
      `<input id="qSentenceInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="complete the blank..." />` +
      `<div class="qtype-fb" id="qSentenceFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qSentenceInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const isOk = q.sentence.targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qSentenceFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.sentence.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 900);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else if (q.mech === "translate") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qsent-wrap">` +
      `<div class="qsent-text">${q.translation.source}</div>` +
      `<div class="qsent-hint">(${q.translation.hint})</div>` +
      `<input id="qTranslateInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="write the translation..." />` +
      `<div class="qtype-fb" id="qTranslateFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTranslateInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = normalizeQuizAnswer(this.value);
      const isOk = q.translation.targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTranslateFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.translation.answer;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 900);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qbubble-wrap">` +
      `<div class="qbubble-verb">${q.source}</div>` +
      `<canvas class="qbubble-canvas" id="qBubbleCanvas"></canvas>` +
      `</div>`;
    setTimeout(() => initBubbles(q.opts, q.correct), 40);
  }

  const p1 = quizQuestions[quizIdx + 1];
  const p2 = quizQuestions[quizIdx + 2];
  if (c2) c2.innerHTML = p1 ? `<div class="quiz-card-label-peek">${p1.label}</div>` : "";
  if (c3) c3.innerHTML = p2 ? `<div class="quiz-card-label-peek">${p2.label}</div>` : "";

  updateQuizHeader();
}

/* ════════════════════════════════════════════════════════
   B U B B L E   M E C H A N I C
   ════════════════════════════════════════════════════════ */

let bubbleRAF = null;
let bubbles = [];

function initBubbles(opts, correct) {
  const canvas = document.getElementById("qBubbleCanvas");
  if (!canvas) return;
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";

  const PALETTES = isDark ? [
    { fill: "#ff6b3528", stroke: "#ff9a5c", text: "#ffb380" },
    { fill: "#7c5cfc28", stroke: "#a78bfa", text: "#c4b5fd" },
    { fill: "#0dbfa028", stroke: "#34d9be", text: "#6ee7d8" },
    { fill: "#f43f5e28", stroke: "#fb7185", text: "#fda4af" },
  ] : [
    { fill: "#ff6b3518", stroke: "#ff6b35", text: "#c84a10" },
    { fill: "#7c5cfc18", stroke: "#7c5cfc", text: "#5b3dd4" },
    { fill: "#0dbfa018", stroke: "#0dbfa0", text: "#0a8a74" },
    { fill: "#f43f5e18", stroke: "#f43f5e", text: "#c01a3c" },
  ];

  const palOrder = [0, 1, 2, 3].sort(() => Math.random() - 0.5);

  const R = Math.min(W * 0.18, H * 0.20, 62);

  const quadCenters = [
    { x: W * 0.27, y: H * 0.28 },
    { x: W * 0.73, y: H * 0.28 },
    { x: W * 0.27, y: H * 0.72 },
    { x: W * 0.73, y: H * 0.72 },
  ];

  bubbles = opts.map((opt, i) => {
    const qc = quadCenters[i];
    return {
      x: qc.x + (Math.random() - 0.5) * 16,
      y: qc.y + (Math.random() - 0.5) * 16,
      r: R + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      phase: Math.random() * Math.PI * 2,
      text: opt,
      correct: opt === correct,
      pal: PALETTES[palOrder[i]],
      state: 'alive',
      popT: 0,
      particles: [],
    };
  });

  /* Separar solapamientos iniciales */
  for (let iter = 0; iter < 40; iter++) {
    for (let a = 0; a < bubbles.length; a++) {
      for (let b2 = a + 1; b2 < bubbles.length; b2++) {
        const ba = bubbles[a], bb = bubbles[b2];
        const dx = bb.x - ba.x, dy = bb.y - ba.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = ba.r + bb.r + 6;
        if (dist < minD && dist > 0) {
          const push = (minD - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          ba.x -= nx * push; ba.y -= ny * push;
          bb.x += nx * push; bb.y += ny * push;
        }
      }
    }
  }

  for (const b of bubbles) {
    b.x = Math.max(b.r, Math.min(W - b.r, b.x));
    b.y = Math.max(b.r, Math.min(H - b.r, b.y));
  }

  let done = false;
  let t = 0;

  function spawnParticles(b) {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 2.5 + Math.random() * 3;
      b.particles.push({
        x: b.x, y: b.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 3 + Math.random() * 4,
        life: 1,
        color: b.pal.stroke,
      });
    }
  }

  function drawBubble(b) {
    if (b.state === 'dead') return;

    ctx.save();

    if (b.state === 'popping-ok') {
      b.popT += 0.055;
      const eased = 1 - Math.pow(1 - Math.min(b.popT, 1), 3);
      const scale = 1 + eased * 0.7;
      ctx.globalAlpha = Math.max(0, 1 - eased * 1.1);
      ctx.translate(b.x, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4 * (1 / scale);
      ctx.stroke();

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3 * (1 / scale);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r * 0.28, 0);
      ctx.lineTo(-b.r * 0.06, b.r * 0.24);
      ctx.lineTo(b.r * 0.30, -b.r * 0.22);
      ctx.stroke();

      if (b.popT >= 1) b.state = 'dead';

    } else if (b.state === 'popping-no') {
      b.popT += 0.055;
      const shakeAmp = Math.max(0, 1 - b.popT) * 10;
      const shakeX = Math.sin(b.popT * 38) * shakeAmp;
      const scale = Math.max(0, 1 - Math.max(0, b.popT - 0.35) * 1.4);
      ctx.globalAlpha = Math.max(0, 1 - Math.max(0, b.popT - 0.35) * 1.8);
      ctx.translate(b.x + shakeX, b.y);
      ctx.scale(scale, scale);

      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#2d0a1255' : '#fef2f2';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-b.r * 0.25, -b.r * 0.25);
      ctx.lineTo(b.r * 0.25, b.r * 0.25);
      ctx.moveTo(b.r * 0.25, -b.r * 0.25);
      ctx.lineTo(-b.r * 0.25, b.r * 0.25);
      ctx.stroke();

      ctx.font = `700 ${Math.min(16, (b.r * 1.3) / (b.text.length * 0.6))}px "DM Sans",sans-serif`;
      ctx.fillStyle = '#f43f5e';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha *= 0.5;
      ctx.fillText(b.text, 0, b.r * 0.55);

      if (b.popT >= 1) b.state = 'dead';

    } else {
      /* ── ALIVE state: bob animation only, NO squish ── */
      /* Squish was removed because applying scaleX/Y after ctx.translate
         distorted the radius used for hit-detection and caused visual
         size glitches on wall contact. Pure bob + velocity damping near
         walls gives a clean, stable look. */
      const bob = Math.sin(t * 1.1 + b.phase) * 2.5;

      ctx.translate(b.x, b.y + bob);

      /* Soft shadow */
      ctx.shadowColor = b.pal.stroke + "55";
      ctx.shadowBlur = 14;
      ctx.shadowOffsetY = 4;

      /* Radial gradient fill */
      const grd = ctx.createRadialGradient(-b.r * 0.25, -b.r * 0.25, b.r * 0.05, 0, 0, b.r);
      grd.addColorStop(0, b.pal.stroke + "55");
      grd.addColorStop(1, b.pal.fill);
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      /* Reset shadow before stroke so it doesn't double */
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      /* Stroke */
      ctx.beginPath();
      ctx.arc(0, 0, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = b.pal.stroke;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      /* Large shine */
      ctx.beginPath();
      ctx.ellipse(-b.r * 0.28, -b.r * 0.32, b.r * 0.24, b.r * 0.13, -0.45, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.60)";
      ctx.fill();

      /* Mini shine */
      ctx.beginPath();
      ctx.ellipse(-b.r * 0.12, -b.r * 0.50, b.r * 0.08, b.r * 0.05, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.40)";
      ctx.fill();

      /* Text */
      const maxW = b.r * 1.65;
      const chars = Math.max(b.text.length, 2);
      const fs = Math.min(18, maxW / (chars * 0.56));
      ctx.font = `800 ${fs}px "DM Sans", sans-serif`;
      ctx.fillStyle = b.pal.text;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(b.text, 0, 1);
    }

    ctx.restore();
  }

  function drawParticles(b) {
    for (const p of b.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12;
      p.life -= 0.035;
      if (p.life <= 0) continue;
      ctx.save();
      ctx.globalAlpha = p.life * 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    }
    b.particles = b.particles.filter(p => p.life > 0);
  }

  function animate() {
    if (!document.getElementById("qBubbleCanvas")) {
      cancelAnimationFrame(bubbleRAF);
      return;
    }
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    const alive = bubbles.filter(b => b.state === 'alive');
    for (const b of alive) {
      b.x += b.vx;
      b.y += b.vy;
      b.vx += (Math.random() - 0.5) * 0.04;
      b.vy += (Math.random() - 0.5) * 0.04;

      /* Cap speed */
      const spd = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (spd > 0.65) { b.vx = b.vx / spd * 0.65; b.vy = b.vy / spd * 0.65; }

      /* ── Wall bounce: hard clamp + velocity flip, no squish ── */
      /* Previously the bubble used scaleX/Y near walls, which caused
         visible size changes. Now we just bounce and damp velocity. */
      if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.85; }
      if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.85; }
      if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy) * 0.85; }
      if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy) * 0.85; }
    }

    /* Elastic collision between bubbles */
    for (let a = 0; a < alive.length; a++) {
      for (let i = a + 1; i < alive.length; i++) {
        const ba = alive[a], bb = alive[i];
        const dx = bb.x - ba.x;
        const dy = bb.y - ba.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minD = ba.r + bb.r;
        if (dist < minD && dist > 0.01) {
          const overlap = (minD - dist) / 2;
          const nx = dx / dist, ny = dy / dist;
          ba.x -= nx * overlap; ba.y -= ny * overlap;
          bb.x += nx * overlap; bb.y += ny * overlap;
          const dvx = ba.vx - bb.vx;
          const dvy = ba.vy - bb.vy;
          const dot = dvx * nx + dvy * ny;
          if (dot > 0) {
            ba.vx -= dot * nx * 0.9;
            ba.vy -= dot * ny * 0.9;
            bb.vx += dot * nx * 0.9;
            bb.vy += dot * ny * 0.9;
          }
        }
      }
    }

    for (const b of bubbles) {
      drawParticles(b);
      drawBubble(b);
    }

    bubbleRAF = requestAnimationFrame(animate);
  }

  animate();

  /* ── Hit detection ── */
  function handleTap(clientX, clientY) {
    if (quizLocked) return;
    const rect = canvas.getBoundingClientRect();
    const mx = clientX - rect.left;
    const my = clientY - rect.top;

    for (const b of bubbles) {
      if (b.state !== 'alive') continue;
      const dx = mx - b.x;
      const dy = my - b.y;
      if (Math.sqrt(dx * dx + dy * dy) > b.r) continue;

      quizLocked = true;

      const _isOkBubble = !!b.correct;
      if (_isOkBubble) {
        b.state = 'popping-ok';
        spawnParticles(b);
        for (const ob of bubbles) {
          if (ob !== b) { ob.state = 'popping-no'; ob.popT = 0.38; }
        }
      } else {
        b.state = 'popping-no';
        b.popT = 0;
        for (const ob of bubbles) {
          if (ob.correct) {
            ob.state = 'popping-ok';
            spawnParticles(ob);
          } else if (ob !== b) {
            ob.state = 'popping-no';
            ob.popT = 0.38;
          }
        }
      }
      registerQuizAnswer(quizQuestions[quizIdx].verb, _isOkBubble);

      updateQuizHeader();
      animateToNextQuestion("up", 1100);
      break;
    }
  }

  canvas.addEventListener("touchstart", e => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    handleTap(touch.clientX, touch.clientY);
  }, { passive: false });

  canvas.addEventListener("mousedown", e => {
    handleTap(e.clientX, e.clientY);
  });
}

/* ════════════════════════════════════════════════════════
   S W I P E   A D V A N C E
   ════════════════════════════════════════════════════════ */

function quizAdvanceSwipe(swiped) {
  if (quizLocked) return;
  quizLocked = true;
  const q = quizQuestions[quizIdx];
  const isOk = swiped === q.correctSide;

  const optL = document.getElementById("qOptL");
  const optR = document.getElementById("qOptR");
  if (optL && optR) {
    if (swiped === "left") {
      optL.classList.add(isOk ? "qsw-flash-ok" : "qsw-flash-no");
      if (!isOk) optR.classList.add("qsw-flash-ok");
    } else {
      optR.classList.add(isOk ? "qsw-flash-ok" : "qsw-flash-no");
      if (!isOk) optL.classList.add("qsw-flash-ok");
    }
  }

  registerQuizAnswer(q.verb, isOk);
  updateQuizHeader();
  hideSwipeGhosts();

  const c1 = document.getElementById("qCard1");
  const tx = swiped === "right" ? 160 : -160;
  const rot = swiped === "right" ? 18 : -18;
  c1.style.transition = "transform 0.28s cubic-bezier(0.4,0,0.6,1), opacity 0.28s";
  c1.style.transform = `translateX(${tx}%) rotate(${rot}deg)`;
  c1.style.opacity = "0";

  promoteBackCards();

  setTimeout(() => {
    quizIdx++;
    renderQuizQuestion(true);
  }, 300);
}

/* ════════════════════════════════════════════════════════
   S W I P E   G E S T U R E
   ════════════════════════════════════════════════════════ */

let qDrag = false, qSx = 0, qSy = 0, qCx = 0, qCy = 0;

function qDragStart(e) {
  if (!quizQuestions[quizIdx] || quizQuestions[quizIdx].mech !== "swipe" || quizLocked) return;
  qDrag = true;
  const pt = e.touches ? e.touches[0] : e;
  qSx = pt.clientX; qSy = pt.clientY;
  qCx = 0; qCy = 0;
  const c1 = document.getElementById("qCard1");
  c1.classList.add("dragging");
}

function qDragMove(e) {
  if (!qDrag) return;
  const pt = e.touches ? e.touches[0] : e;
  qCx = pt.clientX - qSx;
  qCy = pt.clientY - qSy;

  const c1 = document.getElementById("qCard1");
  const rot = qCx * 0.05;
  c1.style.transform = `translateX(${qCx}px) translateY(${qCy * 0.3}px) rotate(${rot}deg)`;

  const t = 40;
  const optL = document.getElementById("qOptL");
  const optR = document.getElementById("qOptR");
  if (optL && optR) {
    if (qCx < -t) {
      optL.style.background = "var(--quiz-hover)"; optL.style.color = "var(--quiz-hover-text)";
      optR.style.background = ""; optR.style.color = "";
    } else if (qCx > t) {
      optR.style.background = "var(--quiz-hover)"; optR.style.color = "var(--quiz-hover-text)";
      optL.style.background = ""; optL.style.color = "";
    } else {
      optL.style.background = ""; optL.style.color = "";
      optR.style.background = ""; optR.style.color = "";
    }
  }
}

function qDragEnd() {
  if (!qDrag) return;
  qDrag = false;
  const c1 = document.getElementById("qCard1");
  c1.classList.remove("dragging");

  const THRESHOLD = 80;
  if (qCx > THRESHOLD) {
    quizAdvanceSwipe("right");
  } else if (qCx < -THRESHOLD) {
    quizAdvanceSwipe("left");
  } else {
    c1.style.transition = "transform 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)";
    c1.style.transform = "";
    const optL = document.getElementById("qOptL");
    const optR = document.getElementById("qOptR");
    if (optL) { optL.style.background = ""; optL.style.color = ""; }
    if (optR) { optR.style.background = ""; optR.style.color = ""; }
    hideSwipeGhosts();
  }
}

/* ════════════════════════════════════════════════════════
   Q U I Z   R E S U L T S
   ════════════════════════════════════════════════════════ */

/* ── Registrar respuesta de quiz (cuenta original + set de fallados) ── */
function registerQuizAnswer(verb, isOk) {
  if (quizPracticeMode) {
    // En modo práctica solo actualizamos el set, no el resumen
    if (isOk) {
      quizFailedSet.delete(verb);
      showQuizPracticePill(true);
    } else {
      quizFailedSet.add(verb);
    }
  } else {
    if (isOk) {
      quizOk++;
    } else {
      quizNo++;
      quizFailedSet.add(verb);
    }
  }
}

/* ── Inicia una vuelta de práctica con los verbos fallados ── */
function startQuizPracticeRound() {
  quizPracticeMode = true;
  document.body.classList.add("is-quiz-review");
  document.body.classList.remove("is-card-review");
  const pool = ALL_VERBS.slice(0, deck.length);
  const failedArr = Array.from(quizFailedSet);
  // Para cada verbo fallado generamos una nueva pregunta (mecánica aleatoria)
  quizQuestions = shuffle(failedArr).map(v => buildQuestion(v, pool));
  quizIdx = 0;
  quizLocked = false;
  showQuizPracticePill(true);
  // Header refleja la vuelta de práctica
  document.getElementById("progressLabel").textContent = `1 / ${quizQuestions.length}`;
  document.getElementById("progressFill").style.width = "0%";
  setTimeout(() => renderQuizQuestion(true), 30);
}

/* ── Pill de modo práctica del quiz ── */
function showQuizPracticePill(show) {
  let pill = document.getElementById("quizPracticePill");
  if (show) {
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "quizPracticePill";
      pill.className = "practice-banner practice-banner-quiz";
      pill.innerHTML = (
        '<span class="practice-banner-icon">!</span>' +
        '<div class="practice-banner-body">' +
        '<div class="practice-banner-title">Corrección activa</div>' +
        '<div class="practice-banner-sub">Wrong answers pendientes</div>' +
        '</div>' +
        '<div class="practice-banner-count"><b id="quizPracticeCount">0</b><span>por dominar</span></div>'
      );
      const wrap = document.querySelector(".progress-wrap");
      wrap.parentNode.insertBefore(pill, wrap);
    }
    pill.classList.add("show");
    const cnt = document.getElementById("quizPracticeCount");
    if (cnt) {
      const oldVal = parseInt(cnt.textContent || "0", 10);
      const newVal = quizFailedSet.size;
      cnt.textContent = newVal;
      if (oldVal !== newVal) {
        cnt.classList.remove("count-bump");
        void cnt.offsetWidth;
        cnt.classList.add("count-bump");
      }
    }
  } else {
    document.body.classList.remove("is-quiz-review");
    if (pill) pill.classList.remove("show");
  }
}

function showQuizResults() {
  const total = quizOriginalTotal || quizQuestions.length;
  const pct = Math.round((quizOk / Math.max(1, total)) * 100);
  quizPracticeMode = false;
  showQuizPracticePill(false);
  // Goals: count quizzes finished + perfect quizzes
  if (typeof goalsOnQuizFinished === "function") {
    goalsOnQuizFinished({ correct: quizOk, wrong: quizNo, total: total });
  }

  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;
  document.getElementById("scoreCorrect").textContent = quizOk;
  document.getElementById("scoreSkip").textContent = quizNo;

  const qStackCards = document.getElementById("qStackCards");
  qStackCards.classList.add("results-mode");

  document.getElementById("qDirRow").style.display = "none";

  const qResultScreen = document.getElementById("quizResultScreen");
  const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
  const title = pct >= 90 ? "Outstanding!" : pct >= 70 ? "Great work!" : pct >= 50 ? "Good effort!" : "Keep going!";
  const message = pct >= 90 ? "You nailed every conjugation."
    : pct >= 70 ? "Solid progress — almost there."
      : pct >= 50 ? "Practice a bit more and you'll get it."
        : "Repetition is the key. Don't stop now.";

  qResultScreen.innerHTML = `
    <div class="qresult-emoji">${emoji}</div>
    <div class="qresult-title">${title}</div>
    <p class="qresult-msg">${message}</p>
    <div class="qresult-stats">
      <div class="qrs ok"><b>${quizOk}</b><span>Correct</span></div>
      <div class="qrs no"><b>${quizNo}</b><span>Wrong</span></div>
      <div class="qrs score"><b>${pct}%</b><span>Score</span></div>
    </div>
    <div class="qresult-btns">
      <button class="restart-btn" onclick="startQuiz()">Retry Quiz 🔄</button>
      <button class="restart-btn share-btn" onclick="shareResults('quiz')" type="button">Share Results 📤</button>
      <button class="restart-btn quiz-back-btn" onclick="backToCards()">Back to Cards</button>
    </div>
  `;
  qResultScreen.classList.add("show");
}

/* ── Back to cards ── */
function backToCards() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  showQuizPracticePill(false);
  quizPracticeMode = false;
  document.body.classList.remove("is-card-review", "is-quiz-review");
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  buildDeck();
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
}
