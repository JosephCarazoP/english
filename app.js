/* ── CONFIGURACIÓN DE INICIO ── */
const START_DATE = new Date(2026, 3, 23);

/* ── DATA ── */
const ALL_VERBS = [
  { present: "bear", past: "bore", participle: "borne", type: "irregular", sound: "", sentencePres: "Some people cannot <b>bear</b> the cold weather.", sentencePast: "She <b>bore</b> the pain with great courage.", gif: "bear heavy" },
  { present: "buy", past: "bought", participle: "bought", type: "irregular", sound: "", sentencePres: "I <b>buy</b> fresh vegetables every morning.", sentencePast: "Yesterday, I <b>bought</b> a gift for my mother.", gif: "buying" },
  { present: "drive", past: "drove", participle: "driven", type: "irregular", sound: "", sentencePres: "Please <b>drive</b> slowly near the school.", sentencePast: "He <b>drove</b> all night to get to the beach.", gif: "driving" },
  { present: "eat", past: "ate", participle: "eaten", type: "irregular", sound: "", sentencePres: "I always <b>eat</b> breakfast at 7:00 AM.", sentencePast: "We <b>ate</b> a delicious pizza last night.", gif: "eating" },
  { present: "find", past: "found", participle: "found", type: "irregular", sound: "", sentencePres: "It is hard to <b>find</b> a parking spot here.", sentencePast: "I <b>found</b> my lost keys under the sofa.", gif: "find" },
  { present: "grow", past: "grew", participle: "grown", type: "irregular", sound: "", sentencePres: "Plants <b>grow</b> faster with enough sunlight.", sentencePast: "The city <b>grew</b> quickly in the last decade.", gif: "growing" },
  { present: "have", past: "had", participle: "had", type: "irregular", sound: "", sentencePres: "I <b>have</b> two brothers and one sister.", sentencePast: "We <b>had</b> a great time at the party.", gif: "having" },
  { present: "know", past: "knew", participle: "known", type: "irregular", sound: "", sentencePres: "I <b>know</b> the answer to your question.", sentencePast: "I <b>knew</b> you were going to call me.", gif: "smart" },
  { present: "lose", past: "lost", participle: "lost", type: "irregular", sound: "", sentencePres: "Don't <b>lose</b> your passport at the airport.", sentencePast: "Our team <b>lost</b> the game by one goal.", gif: "lost" },
  { present: "meet", past: "met", participle: "met", type: "irregular", sound: "", sentencePres: "I want to <b>meet</b> your new friends.", sentencePast: "We <b>met</b> for the first time in high school.", gif: "meeting" },
  { present: "read", past: "read", participle: "read", type: "irregular", sound: "", sentencePres: "You should <b>read</b> the instructions carefully.", sentencePast: "Last night, I <b>read</b> a very long article.", gif: "reading" },
  { present: "speak", past: "spoke", participle: "spoken", type: "irregular", sound: "", sentencePres: "Can you <b>speak</b> more slowly, please?", sentencePast: "He <b>spoke</b> to the manager about the problem.", gif: "speaking" },
  { present: "swim", past: "swam", participle: "swum", type: "irregular", sound: "", sentencePres: "I <b>swim</b> in the pool every Saturday.", sentencePast: "We <b>swam</b> in the ocean during our vacation.", gif: "swimming" },
  { present: "take", past: "took", participle: "taken", type: "irregular", sound: "", sentencePres: "Remember to <b>take</b> your umbrella with you.", sentencePast: "She <b>took</b> the bus to go to the city center.", gif: "taking" },
  { present: "write", past: "wrote", participle: "written", type: "irregular", sound: "", sentencePres: "I <b>write</b> in my journal every evening.", sentencePast: "He <b>wrote</b> a beautiful poem for his wife.", gif: "writing" },
  { present: "visit", past: "visited", participle: "visited", type: "regular", sound: "/id/", sentencePres: "I like to <b>visit</b> museums on weekends.", sentencePast: "They <b>visited</b> many countries last year.", gif: "visiting" },
  { present: "paint", past: "painted", participle: "painted", type: "regular", sound: "/id/", sentencePres: "She wants to <b>paint</b> her room blue.", sentencePast: "He <b>painted</b> a beautiful landscape yesterday.", gif: "painting" },
  { present: "cook", past: "cooked", participle: "cooked", type: "regular", sound: "/t/", sentencePres: "I often <b>cook</b> dinner for my family.", sentencePast: "He <b>cooked</b> a special meal for her birthday.", gif: "cooking" },
  { present: "talk", past: "talked", participle: "talked", type: "regular", sound: "/t/", sentencePres: "We need to <b>talk</b> about the new project.", sentencePast: "I <b>talked</b> to the teacher after the class.", gif: "talking" },
  { present: "walk", past: "walked", participle: "walked", type: "regular", sound: "/t/", sentencePres: "I <b>walk</b> to work when the weather is nice.", sentencePast: "We <b>walked</b> for three miles in the park.", gif: "walking" },
  { present: "work", past: "worked", participle: "worked", type: "regular", sound: "/t/", sentencePres: "They <b>work</b> in a very large office.", sentencePast: "She <b>worked</b> until late last Friday night.", gif: "working" },
  { present: "watch", past: "watched", participle: "watched", type: "regular", sound: "/t/", sentencePres: "Do you want to <b>watch</b> a movie tonight?", sentencePast: "We <b>watched</b> the football game on TV.", gif: "watching" },
  { present: "laugh", past: "laughed", participle: "laughed", type: "regular", sound: "/t/", sentencePres: "Funny movies make me <b>laugh</b> a lot.", sentencePast: "She <b>laughed</b> at the joke I told her.", gif: "laughing" },
  { present: "listen", past: "listened", participle: "listened", type: "regular", sound: "/d/", sentencePres: "I <b>listen</b> to music while I study.", sentencePast: "He <b>listened</b> carefully to the instructions.", gif: "listening" },
  { present: "play", past: "played", participle: "played", type: "regular", sound: "/d/", sentencePres: "The children <b>play</b> in the garden every day.", sentencePast: "We <b>played</b> soccer for two hours yesterday.", gif: "playing" },
  { present: "call", past: "called", participle: "called", type: "regular", sound: "/d/", sentencePres: "I will <b>call</b> you as soon as I arrive.", sentencePast: "She <b>called</b> her mother this morning.", gif: "calling" },
  { present: "arise", past: "arose", participle: "arisen", type: "irregular", sound: "", sentencePres: "New problems <b>arise</b> every single day.", sentencePast: "A huge conflict <b>arose</b> during the meeting.", gif: "rising" },
  { present: "awake", past: "awoke", participle: "awoken", type: "irregular", sound: "", sentencePres: "I usually <b>awake</b> when the sun rises.", sentencePast: "He <b>awoke</b> suddenly in the middle of the night.", gif: "awake" },
  { present: "be", past: "was / were", participle: "been", type: "irregular", sound: "", sentencePres: "Please <b>be</b> patient with the new students.", sentencePast: "I <b>was</b> very happy to see you yesterday.", gif: "being" },
  { present: "beat", past: "beat", participle: "beaten", type: "irregular", sound: "", sentencePres: "Can you <b>beat</b> the high score in this game?", sentencePast: "They <b>beat</b> the rival team last Saturday.", gif: "beat" },
  { present: "become", past: "became", participle: "become", type: "irregular", sound: "", sentencePres: "It is hard to <b>become</b> a professional doctor.", sentencePast: "He <b>became</b> a famous singer in a short time.", gif: "transformation" },
  { present: "begin", past: "began", participle: "begun", type: "irregular", sound: "", sentencePres: "The classes <b>begin</b> at eight in the morning.", sentencePast: "It <b>began</b> to rain just after we left home.", gif: "starting" },
  { present: "bend", past: "bent", participle: "bent", type: "irregular", sound: "", sentencePres: "Be careful not to <b>bend</b> the credit card.", sentencePast: "He <b>bent</b> the metal pipe with his hands.", gif: "bending" },
  { present: "bet", past: "bet", participle: "bet", type: "irregular", sound: "", sentencePres: "I <b>bet</b> you can't finish that huge burger.", sentencePast: "He <b>bet</b> all his money and lost it all.", gif: "betting" },
  { present: "bite", past: "bit", participle: "bit / bitten", type: "irregular", sound: "", sentencePres: "Be careful! That dog might <b>bite</b> you.", sentencePast: "A mosquito <b>bit</b> me on the arm last night.", gif: "bite" },
  { present: "blow", past: "blew", participle: "blown", type: "irregular", sound: "", sentencePres: "The kids love to <b>blow</b> soap bubbles.", sentencePast: "A strong wind <b>blew</b> the leaves away.", gif: "blowing" },
  { present: "break", past: "broke", participle: "broken", type: "irregular", sound: "", sentencePres: "If you <b>break</b> the rules, you will be punished.", sentencePast: "The glass <b>broke</b> into a thousand pieces.", gif: "broken" },
  { present: "bring", past: "brought", participle: "brought", type: "irregular", sound: "", sentencePres: "Always <b>bring</b> your notebook to the class.", sentencePast: "She <b>brought</b> some cookies for the party.", gif: "carrying" },
  { present: "choose", past: "chose", participle: "chosen", type: "irregular", sound: "", sentencePres: "You must <b>choose</b> the correct answer now.", sentencePast: "I <b>chose</b> the red shirt instead of the blue one.", gif: "choosing" },
  { present: "come", past: "came", participle: "come", type: "irregular", sound: "", sentencePres: "Please <b>come</b> to my house this afternoon.", sentencePast: "They <b>came</b> back from their trip yesterday.", gif: "coming" },
  { present: "cut", past: "cut", participle: "cut", type: "irregular", sound: "", sentencePres: "Use these scissors to <b>cut</b> the paper.", sentencePast: "He <b>cut</b> the cake into eight equal pieces.", gif: "cutting" },
  { present: "do", past: "did", participle: "done", type: "irregular", sound: "", sentencePres: "I need to <b>do</b> my homework tonight.", sentencePast: "You <b>did</b> a very good job on the project.", gif: "doing" },
  { present: "drink", past: "drank", participle: "drunk", type: "irregular", sound: "", sentencePres: "You should <b>drink</b> eight glasses of water.", sentencePast: "He <b>drank</b> a cold soda after the race.", gif: "drinking" },
  { present: "fall", past: "fell", participle: "fallen", type: "irregular", sound: "", sentencePres: "Be careful or you will <b>fall</b> on the ice.", sentencePast: "The leaves <b>fell</b> from the trees in autumn.", gif: "falling" },
  { present: "forget", past: "forgot", participle: "forgotten", type: "irregular", sound: "", sentencePres: "I often <b>forget</b> where I put my glasses.", sentencePast: "I <b>forgot</b> to buy milk at the supermarket.", gif: "forget" },
  { present: "get", past: "got", participle: "got / gotten", type: "irregular", sound: "", sentencePres: "I need to <b>get</b> a new pair of shoes.", sentencePast: "She <b>got</b> a perfect score on her exam.", gif: "getting" },
  { present: "give", past: "gave", participle: "given", type: "irregular", sound: "", sentencePres: "Please <b>give</b> me a hand with this box.", sentencePast: "My father <b>gave</b> me this watch for my birthday.", gif: "giving" },
  { present: "go", past: "went", participle: "gone", type: "irregular", sound: "", sentencePres: "I <b>go</b> to the gym four times a week.", sentencePast: "We <b>went</b> to the cinema last Sunday.", gif: "going" },
  { present: "make", past: "made", participle: "made", type: "irregular", sound: "", sentencePres: "I like to <b>make</b> my own clothes.", sentencePast: "She <b>made</b> a delicious chocolate cake.", gif: "making" },
  { present: "see", past: "saw", participle: "seen", type: "irregular", sound: "", sentencePres: "I can <b>see</b> the mountains from my window.", sentencePast: "I <b>saw</b> a famous actor at the airport.", gif: "seeing" },
  { present: "sing", past: "sang", participle: "sung", type: "irregular", sound: "", sentencePres: "She can <b>sing</b> very high notes beautifully.", sentencePast: "We <b>sang</b> happy birthday to our friend.", gif: "singing" },
  { present: "sleep", past: "slept", participle: "slept", type: "irregular", sound: "", sentencePres: "I need to <b>sleep</b> at least seven hours.", sentencePast: "The baby <b>slept</b> peacefully all night.", gif: "sleeping" },
  { present: "think", past: "thought", participle: "thought", type: "irregular", sound: "", sentencePres: "I <b>think</b> it is going to rain today.", sentencePast: "I <b>thought</b> you were at the office.", gif: "thinking" },
  { present: "win", past: "won", participle: "won", type: "irregular", sound: "", sentencePres: "We want to <b>win</b> the championship this year.", sentencePast: "They <b>won</b> the lottery two years ago.", gif: "winning" },
  { present: "accept", past: "accepted", participle: "accepted", type: "regular", sound: "/id/", sentencePres: "Do you <b>accept</b> credit cards here?", sentencePast: "She <b>accepted</b> the job offer immediately.", gif: "yes" },
  { present: "count", past: "counted", participle: "counted", type: "regular", sound: "/id/", sentencePres: "Can you <b>count</b> from one to twenty?", sentencePast: "He <b>counted</b> the money twice to be sure.", gif: "numbers" },
  { present: "need", past: "needed", participle: "needed", type: "regular", sound: "/id/", sentencePres: "I <b>need</b> some help with my homework.", sentencePast: "We <b>needed</b> a bigger car for the trip.", gif: "need" },
  { present: "start", past: "started", participle: "started", type: "regular", sound: "/id/", sentencePres: "The movie will <b>start</b> in five minutes.", sentencePast: "It <b>started</b> to snow early this morning.", gif: "start" },
  { present: "want", past: "wanted", participle: "wanted", type: "regular", sound: "/id/", sentencePres: "I <b>want</b> to travel around the world.", sentencePast: "He <b>wanted</b> to buy a new computer.", gif: "want" },
  { present: "ask", past: "asked", participle: "asked", type: "regular", sound: "/t/", sentencePres: "Don't be afraid to <b>ask</b> questions.", sentencePast: "I <b>asked</b> the police for directions.", gif: "asking" },
  { present: "dance", past: "danced", participle: "danced", type: "regular", sound: "/t/", sentencePres: "They <b>dance</b> salsa very well together.", sentencePast: "We <b>danced</b> all night at the wedding.", gif: "dancing" },
  { present: "finish", past: "finished", participle: "finished", type: "regular", sound: "/t/", sentencePres: "I must <b>finish</b> this report by Friday.", sentencePast: "She <b>finished</b> her dinner very quickly.", gif: "finish" },
  { present: "help", past: "helped", participle: "helped", type: "regular", sound: "/t/", sentencePres: "I am happy to <b>help</b> you with that.", sentencePast: "He <b>helped</b> me carry the heavy bags.", gif: "help" },
  { present: "look", past: "looked", participle: "looked", type: "regular", sound: "/t/", sentencePres: "Please <b>look</b> at the whiteboard now.", sentencePast: "I <b>looked</b> for my keys everywhere.", gif: "looking" },
  { present: "answer", past: "answered", participle: "answered", type: "regular", sound: "/d/", sentencePres: "I always <b>answer</b> my emails promptly.", sentencePast: "He <b>answered</b> all the questions correctly.", gif: "answering" },
  { present: "clean", past: "cleaned", participle: "cleaned", type: "regular", sound: "/d/", sentencePres: "I <b>clean</b> my bedroom every Saturday.", sentencePast: "We <b>cleaned</b> the entire house yesterday.", gif: "cleaning" },
  { present: "love", past: "loved", participle: "loved", type: "regular", sound: "/d/", sentencePres: "I <b>love</b> spending time with my family.", sentencePast: "She <b>loved</b> that movie when she was a kid.", gif: "love" },
  { present: "open", past: "opened", participle: "opened", type: "regular", sound: "/d/", sentencePres: "Could you <b>open</b> the window, please?", sentencePast: "He <b>opened</b> the door for the lady.", gif: "opening" },
  { present: "stay", past: "stayed", participle: "stayed", type: "regular", sound: "/d/", sentencePres: "I usually <b>stay</b> at home on Sundays.", sentencePast: "They <b>stayed</b> in a very nice hotel.", gif: "stay" },
  { present: "bid", past: "bid", participle: "bid", type: "irregular", sound: "", sentencePres: "Investors <b>bid</b> on rare paintings.", sentencePast: "She <b>bid</b> ten dollars for the old book.", gif: "auction" },
  { present: "bind", past: "bound", participle: "bound", type: "irregular", sound: "", sentencePres: "Strong rules <b>bind</b> every member of the club.", sentencePast: "He <b>bound</b> the papers together with a string.", gif: "binding" },
  { present: "bleed", past: "bled", participle: "bled", type: "irregular", sound: "", sentencePres: "Deep cuts often <b>bleed</b> for several minutes.", sentencePast: "His nose <b>bled</b> after the fall.", gif: "bleeding" },
  { present: "breed", past: "bred", participle: "bred", type: "irregular", sound: "", sentencePres: "They <b>breed</b> dogs on a small farm.", sentencePast: "The farmer <b>bred</b> horses for many years.", gif: "breeding" },
  { present: "broadcast", past: "broadcast", participle: "broadcast", type: "irregular", sound: "", sentencePres: "Local stations <b>broadcast</b> the news every hour.", sentencePast: "They <b>broadcast</b> the match live last night.", gif: "broadcast" },
  { present: "build", past: "built", participle: "built", type: "irregular", sound: "", sentencePres: "Engineers <b>build</b> bridges across the river.", sentencePast: "They <b>built</b> a new school in the town.", gif: "building" },
  { present: "burn", past: "burnt", participle: "burnt", type: "irregular", sound: "", sentencePres: "Be careful, hot pans can <b>burn</b> your skin.", sentencePast: "She <b>burnt</b> the toast this morning.", gif: "burning" },
  { present: "burst", past: "burst", participle: "burst", type: "irregular", sound: "", sentencePres: "Balloons <b>burst</b> when you press them too hard.", sentencePast: "The pipe <b>burst</b> during the cold night.", gif: "burst" },
  { present: "cast", past: "cast", participle: "cast", type: "irregular", sound: "", sentencePres: "Fishermen <b>cast</b> their nets at dawn.", sentencePast: "He <b>cast</b> the line into the deep lake.", gif: "casting" },
  { present: "catch", past: "caught", participle: "caught", type: "irregular", sound: "", sentencePres: "Goalkeepers must <b>catch</b> the ball with both hands.", sentencePast: "She <b>caught</b> the bus just in time.", gif: "catching" },
  { present: "cling", past: "clung", participle: "clung", type: "irregular", sound: "", sentencePres: "Wet leaves <b>cling</b> to the windshield.", sentencePast: "The child <b>clung</b> to his mother's hand.", gif: "hugging" },
  { present: "cost", past: "cost", participle: "cost", type: "irregular", sound: "", sentencePres: "Good shoes <b>cost</b> a lot of money.", sentencePast: "The repair <b>cost</b> more than I expected.", gif: "money" },
  { present: "creep", past: "crept", participle: "crept", type: "irregular", sound: "", sentencePres: "Cats often <b>creep</b> silently on the floor.", sentencePast: "He <b>crept</b> into the room without a sound.", gif: "sneaking" },
  { present: "deal", past: "dealt", participle: "dealt", type: "irregular", sound: "", sentencePres: "Good leaders <b>deal</b> with problems calmly.", sentencePast: "She <b>dealt</b> the cards to all the players.", gif: "cards" },
  { present: "dig", past: "dug", participle: "dug", type: "irregular", sound: "", sentencePres: "Dogs love to <b>dig</b> holes in the garden.", sentencePast: "We <b>dug</b> a deep hole for the new tree.", gif: "digging" },
  { present: "draw", past: "drew", participle: "drawn", type: "irregular", sound: "", sentencePres: "Children <b>draw</b> pictures of their family.", sentencePast: "He <b>drew</b> a beautiful portrait of her.", gif: "drawing" },
  { present: "dream", past: "dreamt", participle: "dreamt", type: "irregular", sound: "", sentencePres: "I often <b>dream</b> about flying over the sea.", sentencePast: "She <b>dreamt</b> of becoming a famous artist.", gif: "dreaming" },
  { present: "feed", past: "fed", participle: "fed", type: "irregular", sound: "", sentencePres: "Parents <b>feed</b> their babies several times a day.", sentencePast: "We <b>fed</b> the ducks at the park.", gif: "feeding" },
  { present: "feel", past: "felt", participle: "felt", type: "irregular", sound: "", sentencePres: "I <b>feel</b> happy when I see my friends.", sentencePast: "He <b>felt</b> very tired after the long trip.", gif: "feeling" },
  { present: "fight", past: "fought", participle: "fought", type: "irregular", sound: "", sentencePres: "Soldiers <b>fight</b> to protect their country.", sentencePast: "They <b>fought</b> bravely until the end.", gif: "fighting" },
  { present: "flee", past: "fled", participle: "fled", type: "irregular", sound: "", sentencePres: "Animals <b>flee</b> when they sense danger.", sentencePast: "The thieves <b>fled</b> from the police.", gif: "running away" },
  { present: "fly", past: "flew", participle: "flown", type: "irregular", sound: "", sentencePres: "Birds <b>fly</b> south every winter.", sentencePast: "We <b>flew</b> to Paris for our anniversary.", gif: "flying" },
  { present: "forbid", past: "forbade", participle: "forbidden", type: "irregular", sound: "", sentencePres: "Some schools <b>forbid</b> the use of phones in class.", sentencePast: "His parents <b>forbade</b> him from going out late.", gif: "stop sign" },
  { present: "forgive", past: "forgave", participle: "forgiven", type: "irregular", sound: "", sentencePres: "Good friends <b>forgive</b> small mistakes.", sentencePast: "She <b>forgave</b> him for being so late.", gif: "hug" },
  { present: "freeze", past: "froze", participle: "frozen", type: "irregular", sound: "", sentencePres: "Water can <b>freeze</b> at zero degrees.", sentencePast: "The lake <b>froze</b> completely last winter.", gif: "frozen" },
  { present: "grind", past: "ground", participle: "ground", type: "irregular", sound: "", sentencePres: "Coffee shops <b>grind</b> beans every morning.", sentencePast: "He <b>ground</b> the pepper over the salad.", gif: "grinding" },
  { present: "hang", past: "hung", participle: "hung", type: "irregular", sound: "", sentencePres: "We usually <b>hang</b> our coats by the door.", sentencePast: "She <b>hung</b> the paintings on the wall.", gif: "hanging" },
  { present: "hear", past: "heard", participle: "heard", type: "irregular", sound: "", sentencePres: "I can <b>hear</b> the birds singing outside.", sentencePast: "We <b>heard</b> a strange noise at midnight.", gif: "listening" },
  { present: "hide", past: "hid", participle: "hidden", type: "irregular", sound: "", sentencePres: "Children love to <b>hide</b> behind the curtains.", sentencePast: "He <b>hid</b> the gift in the closet.", gif: "hiding" },
  { present: "hit", past: "hit", participle: "hit", type: "irregular", sound: "", sentencePres: "Don't <b>hit</b> your sister, please.", sentencePast: "The ball <b>hit</b> the window very hard.", gif: "hit" },
  { present: "hold", past: "held", participle: "held", type: "irregular", sound: "", sentencePres: "Parents <b>hold</b> their kids' hands in the street.", sentencePast: "She <b>held</b> the baby in her arms.", gif: "holding" },
  { present: "hurt", past: "hurt", participle: "hurt", type: "irregular", sound: "", sentencePres: "Tight shoes can <b>hurt</b> your feet.", sentencePast: "He <b>hurt</b> his knee playing soccer.", gif: "ouch" },
  { present: "keep", past: "kept", participle: "kept", type: "irregular", sound: "", sentencePres: "Good students <b>keep</b> their notes organized.", sentencePast: "She <b>kept</b> the secret for many years.", gif: "keeping" },
  { present: "kneel", past: "knelt", participle: "knelt", type: "irregular", sound: "", sentencePres: "Many people <b>kneel</b> when they pray.", sentencePast: "He <b>knelt</b> down to tie his shoe.", gif: "kneeling" },
  { present: "knit", past: "knit", participle: "knit", type: "irregular", sound: "", sentencePres: "My grandma loves to <b>knit</b> warm sweaters.", sentencePast: "She <b>knit</b> a beautiful scarf for me.", gif: "knitting" },
  { present: "lay", past: "laid", participle: "laid", type: "irregular", sound: "", sentencePres: "Hens <b>lay</b> eggs almost every day.", sentencePast: "He <b>laid</b> the book on the table.", gif: "laying" },
  { present: "lead", past: "led", participle: "led", type: "irregular", sound: "", sentencePres: "Good captains <b>lead</b> their team with respect.", sentencePast: "She <b>led</b> the group through the forest.", gif: "leading" },
  { present: "lean", past: "leant", participle: "leant", type: "irregular", sound: "", sentencePres: "Don't <b>lean</b> on the new fence.", sentencePast: "He <b>leant</b> against the wall to rest.", gif: "leaning" },
  { present: "leap", past: "leapt", participle: "leapt", type: "irregular", sound: "", sentencePres: "Frogs <b>leap</b> from one rock to another.", sentencePast: "She <b>leapt</b> over the small puddle.", gif: "jumping" },
  { present: "learn", past: "learnt", participle: "learnt", type: "irregular", sound: "", sentencePres: "Babies <b>learn</b> to walk around their first year.", sentencePast: "I <b>learnt</b> a lot during my trip.", gif: "learning" },
  { present: "leave", past: "left", participle: "left", type: "irregular", sound: "", sentencePres: "Workers usually <b>leave</b> the office at five.", sentencePast: "We <b>left</b> the party very early.", gif: "leaving" },
  { present: "lend", past: "lent", participle: "lent", type: "irregular", sound: "", sentencePres: "Good friends <b>lend</b> a hand when needed.", sentencePast: "He <b>lent</b> me his car for the weekend.", gif: "lending" },
  { present: "let", past: "let", participle: "let", type: "irregular", sound: "", sentencePres: "Please <b>let</b> me know if you need help.", sentencePast: "She <b>let</b> the dog come into the house.", gif: "allow" },
  { present: "lie", past: "lay", participle: "lain", type: "irregular", sound: "", sentencePres: "Cats love to <b>lie</b> in the sun for hours.", sentencePast: "He <b>lay</b> on the couch all afternoon.", gif: "lying down" },
  { present: "light", past: "lit", participle: "lit", type: "irregular", sound: "", sentencePres: "Please <b>light</b> the candles before dinner.", sentencePast: "She <b>lit</b> the fireplace last night.", gif: "lighting" },
  { present: "mean", past: "meant", participle: "meant", type: "irregular", sound: "", sentencePres: "Words can <b>mean</b> different things in context.", sentencePast: "I <b>meant</b> to call you yesterday.", gif: "meaning" },
  { present: "mistake", past: "mistook", participle: "mistaken", type: "irregular", sound: "", sentencePres: "People sometimes <b>mistake</b> me for my brother.", sentencePast: "I <b>mistook</b> her for an old friend.", gif: "confused" },
  { present: "overcome", past: "overcame", participle: "overcome", type: "irregular", sound: "", sentencePres: "Brave people <b>overcome</b> their fears every day.", sentencePast: "She <b>overcame</b> many problems in her life.", gif: "victory" },
  { present: "pay", past: "paid", participle: "paid", type: "irregular", sound: "", sentencePres: "Customers <b>pay</b> at the cashier on the way out.", sentencePast: "He <b>paid</b> the bill with a credit card.", gif: "paying" },
  { present: "put", past: "put", participle: "put", type: "irregular", sound: "", sentencePres: "Please <b>put</b> the books on the shelf.", sentencePast: "She <b>put</b> the keys in her bag.", gif: "putting" },
  { present: "ride", past: "rode", participle: "ridden", type: "irregular", sound: "", sentencePres: "Many kids <b>ride</b> their bikes to school.", sentencePast: "We <b>rode</b> horses on the beach yesterday.", gif: "riding" },
  { present: "ring", past: "rang", participle: "rung", type: "irregular", sound: "", sentencePres: "Church bells <b>ring</b> every Sunday morning.", sentencePast: "The phone <b>rang</b> three times last night.", gif: "bell" },
  { present: "rise", past: "rose", participle: "risen", type: "irregular", sound: "", sentencePres: "The sun <b>rises</b> in the east each day.", sentencePast: "Prices <b>rose</b> sharply last month.", gif: "sunrise" },
  { present: "run", past: "ran", participle: "run", type: "irregular", sound: "", sentencePres: "Athletes <b>run</b> every morning before work.", sentencePast: "I <b>ran</b> five kilometers this morning.", gif: "running" },
  { present: "say", past: "said", participle: "said", type: "irregular", sound: "", sentencePres: "Please <b>say</b> the word very clearly.", sentencePast: "She <b>said</b> goodbye and left the room.", gif: "talking" },
  { present: "seek", past: "sought", participle: "sought", type: "irregular", sound: "", sentencePres: "Researchers <b>seek</b> answers to hard questions.", sentencePast: "He <b>sought</b> help from his teacher.", gif: "searching" },
  { present: "sell", past: "sold", participle: "sold", type: "irregular", sound: "", sentencePres: "Bakeries <b>sell</b> fresh bread every morning.", sentencePast: "We <b>sold</b> our old car last week.", gif: "selling" },
  { present: "send", past: "sent", participle: "sent", type: "irregular", sound: "", sentencePres: "Companies <b>send</b> emails to their clients.", sentencePast: "She <b>sent</b> a postcard from Italy.", gif: "mail" },
  { present: "set", past: "set", participle: "set", type: "irregular", sound: "", sentencePres: "Please <b>set</b> the table before dinner.", sentencePast: "He <b>set</b> the alarm for six in the morning.", gif: "setting" },
  { present: "sew", past: "sewed", participle: "sewn", type: "irregular", sound: "", sentencePres: "Tailors <b>sew</b> beautiful suits by hand.", sentencePast: "She <b>sewed</b> a button on my jacket.", gif: "sewing" },
  { present: "shake", past: "shook", participle: "shaken", type: "irregular", sound: "", sentencePres: "Always <b>shake</b> the bottle before opening it.", sentencePast: "He <b>shook</b> my hand with a big smile.", gif: "shaking" },
  { present: "shine", past: "shone", participle: "shone", type: "irregular", sound: "", sentencePres: "Stars <b>shine</b> brightly in the country sky.", sentencePast: "The sun <b>shone</b> all afternoon yesterday.", gif: "shining" },
  { present: "shoot", past: "shot", participle: "shot", type: "irregular", sound: "", sentencePres: "Photographers <b>shoot</b> hundreds of pictures.", sentencePast: "He <b>shot</b> the ball into the goal.", gif: "shooting" },
  { present: "show", past: "showed", participle: "shown", type: "irregular", sound: "", sentencePres: "Teachers <b>show</b> examples on the board.", sentencePast: "She <b>showed</b> us her new house.", gif: "showing" },
  { present: "shrink", past: "shrank", participle: "shrunk", type: "irregular", sound: "", sentencePres: "Wool sweaters often <b>shrink</b> in hot water.", sentencePast: "My T-shirt <b>shrank</b> after one wash.", gif: "shrink" },
  { present: "shut", past: "shut", participle: "shut", type: "irregular", sound: "", sentencePres: "Please <b>shut</b> the door when you leave.", sentencePast: "She <b>shut</b> her eyes and made a wish.", gif: "closing" },
  { present: "sink", past: "sank", participle: "sunk", type: "irregular", sound: "", sentencePres: "Heavy stones <b>sink</b> quickly in the water.", sentencePast: "The boat <b>sank</b> during the storm.", gif: "sinking" },
  { present: "sit", past: "sat", participle: "sat", type: "irregular", sound: "", sentencePres: "Please <b>sit</b> down and relax for a while.", sentencePast: "We <b>sat</b> together during the movie.", gif: "sitting" },
  { present: "slide", past: "slid", participle: "slid", type: "irregular", sound: "", sentencePres: "Children love to <b>slide</b> in the playground.", sentencePast: "He <b>slid</b> on the icy sidewalk.", gif: "sliding" },
  { present: "smell", past: "smelt", participle: "smelt", type: "irregular", sound: "", sentencePres: "Dogs can <b>smell</b> things from far away.", sentencePast: "The kitchen <b>smelt</b> like fresh bread.", gif: "smelling" },
  { present: "sow", past: "sowed", participle: "sown", type: "irregular", sound: "", sentencePres: "Farmers <b>sow</b> seeds in the early spring.", sentencePast: "We <b>sowed</b> tomato seeds last weekend.", gif: "planting" },
  { present: "speed", past: "sped", participle: "sped", type: "irregular", sound: "", sentencePres: "Cars often <b>speed</b> on this empty highway.", sentencePast: "He <b>sped</b> through the yellow light.", gif: "fast car" },
  { present: "spell", past: "spelt", participle: "spelt", type: "irregular", sound: "", sentencePres: "Can you <b>spell</b> your last name, please?", sentencePast: "She <b>spelt</b> every word correctly.", gif: "spelling" },
  { present: "spend", past: "spent", participle: "spent", type: "irregular", sound: "", sentencePres: "I usually <b>spend</b> my weekends at home.", sentencePast: "We <b>spent</b> too much money on dinner.", gif: "money" },
  { present: "spill", past: "spilt", participle: "spilt", type: "irregular", sound: "", sentencePres: "Be careful, you might <b>spill</b> the coffee.", sentencePast: "He <b>spilt</b> juice on the new carpet.", gif: "spilling" },
  { present: "spin", past: "spun", participle: "spun", type: "irregular", sound: "", sentencePres: "Tops can <b>spin</b> for a long time.", sentencePast: "She <b>spun</b> the wheel with all her strength.", gif: "spinning" },
  { present: "spit", past: "spat", participle: "spat", type: "irregular", sound: "", sentencePres: "Please don't <b>spit</b> on the sidewalk.", sentencePast: "The baby <b>spat</b> out the medicine.", gif: "spit" },
  { present: "split", past: "split", participle: "split", type: "irregular", sound: "", sentencePres: "Friends often <b>split</b> the bill at restaurants.", sentencePast: "We <b>split</b> the cake into eight pieces.", gif: "splitting" },
  { present: "spoil", past: "spoilt", participle: "spoilt", type: "irregular", sound: "", sentencePres: "Don't <b>spoil</b> the surprise for the kids.", sentencePast: "Bad weather <b>spoilt</b> our picnic plans.", gif: "spoiled" },
  { present: "spread", past: "spread", participle: "spread", type: "irregular", sound: "", sentencePres: "News can <b>spread</b> very fast online.", sentencePast: "She <b>spread</b> butter on the toast.", gif: "spreading" },
  { present: "spring", past: "sprang", participle: "sprung", type: "irregular", sound: "", sentencePres: "Cats <b>spring</b> when they see a mouse.", sentencePast: "He <b>sprang</b> out of bed at the alarm.", gif: "jumping" },
  { present: "stand", past: "stood", participle: "stood", type: "irregular", sound: "", sentencePres: "Soldiers <b>stand</b> straight during the parade.", sentencePast: "We <b>stood</b> in line for an hour.", gif: "standing" },
  { present: "steal", past: "stole", participle: "stolen", type: "irregular", sound: "", sentencePres: "Thieves sometimes <b>steal</b> from tourists.", sentencePast: "Someone <b>stole</b> my wallet at the station.", gif: "stealing" },
  { present: "stick", past: "stuck", participle: "stuck", type: "irregular", sound: "", sentencePres: "Glue helps you <b>stick</b> paper together.", sentencePast: "The note <b>stuck</b> to the fridge for weeks.", gif: "sticking" },
  { present: "sting", past: "stung", participle: "stung", type: "irregular", sound: "", sentencePres: "Bees can <b>sting</b> when they feel threatened.", sentencePast: "A bee <b>stung</b> me on the arm.", gif: "bee" },
  { present: "stink", past: "stank", participle: "stunk", type: "irregular", sound: "", sentencePres: "Old socks usually <b>stink</b> after a long day.", sentencePast: "The trash <b>stank</b> all weekend.", gif: "stinky" },
  { present: "stride", past: "strode", participle: "stridden", type: "irregular", sound: "", sentencePres: "Confident people <b>stride</b> down the street.", sentencePast: "He <b>strode</b> into the room with confidence.", gif: "walking" },
  { present: "strike", past: "struck", participle: "struck", type: "irregular", sound: "", sentencePres: "Lightning may <b>strike</b> the same place twice.", sentencePast: "The clock <b>struck</b> midnight loudly.", gif: "striking" },
  { present: "swear", past: "swore", participle: "sworn", type: "irregular", sound: "", sentencePres: "Witnesses <b>swear</b> to tell the truth.", sentencePast: "He <b>swore</b> he would never lie again.", gif: "promise" },
  { present: "sweat", past: "sweat", participle: "sweat", type: "irregular", sound: "", sentencePres: "Athletes <b>sweat</b> during heavy training.", sentencePast: "I <b>sweat</b> a lot in yesterday's class.", gif: "sweating" },
  { present: "sweep", past: "swept", participle: "swept", type: "irregular", sound: "", sentencePres: "Please <b>sweep</b> the floor after lunch.", sentencePast: "She <b>swept</b> the leaves off the porch.", gif: "sweeping" },
  { present: "swell", past: "swelled", participle: "swollen", type: "irregular", sound: "", sentencePres: "Ankles often <b>swell</b> after a long flight.", sentencePast: "His knee <b>swelled</b> after the fall.", gif: "swelling" },
  { present: "swing", past: "swung", participle: "swung", type: "irregular", sound: "", sentencePres: "Kids love to <b>swing</b> in the park.", sentencePast: "He <b>swung</b> the bat and hit the ball.", gif: "swinging" },
  { present: "teach", past: "taught", participle: "taught", type: "irregular", sound: "", sentencePres: "Good teachers <b>teach</b> with patience.", sentencePast: "My father <b>taught</b> me how to drive.", gif: "teaching" },
  { present: "tear", past: "tore", participle: "torn", type: "irregular", sound: "", sentencePres: "Be careful, paper can <b>tear</b> easily.", sentencePast: "She <b>tore</b> the letter into pieces.", gif: "tearing" },
  { present: "tell", past: "told", participle: "told", type: "irregular", sound: "", sentencePres: "Please <b>tell</b> me the truth right now.", sentencePast: "He <b>told</b> a funny story at dinner.", gif: "telling" },
  { present: "throw", past: "threw", participle: "thrown", type: "irregular", sound: "", sentencePres: "Quarterbacks <b>throw</b> the ball with power.", sentencePast: "She <b>threw</b> the keys across the room.", gif: "throwing" },
  { present: "thrust", past: "thrust", participle: "thrust", type: "irregular", sound: "", sentencePres: "Boxers <b>thrust</b> their fists with power.", sentencePast: "He <b>thrust</b> the door open in a hurry.", gif: "push" },
  { present: "tread", past: "trod", participle: "trodden", type: "irregular", sound: "", sentencePres: "Hikers <b>tread</b> carefully on wet rocks.", sentencePast: "I accidentally <b>trod</b> on his foot.", gif: "stepping" },
  { present: "understand", past: "understood", participle: "understood", type: "irregular", sound: "", sentencePres: "Good listeners <b>understand</b> people quickly.", sentencePast: "I finally <b>understood</b> the math problem.", gif: "thinking" },
  { present: "undergo", past: "underwent", participle: "undergone", type: "irregular", sound: "", sentencePres: "Patients sometimes <b>undergo</b> long surgeries.", sentencePast: "He <b>underwent</b> a difficult operation.", gif: "hospital" },
  { present: "undertake", past: "undertook", participle: "undertaken", type: "irregular", sound: "", sentencePres: "Brave teams <b>undertake</b> hard projects.", sentencePast: "She <b>undertook</b> a huge research project.", gif: "work" },
  { present: "wake", past: "woke", participle: "woken", type: "irregular", sound: "", sentencePres: "I usually <b>wake</b> up before sunrise.", sentencePast: "He <b>woke</b> up late this morning.", gif: "waking up" },
  { present: "wear", past: "wore", participle: "worn", type: "irregular", sound: "", sentencePres: "Pilots <b>wear</b> uniforms during flights.", sentencePast: "She <b>wore</b> a red dress to the party.", gif: "wearing" },
  { present: "weave", past: "wove", participle: "woven", type: "irregular", sound: "", sentencePres: "Skilled artisans <b>weave</b> beautiful baskets.", sentencePast: "She <b>wove</b> a colorful blanket by hand.", gif: "weaving" },
  { present: "weep", past: "wept", participle: "wept", type: "irregular", sound: "", sentencePres: "People sometimes <b>weep</b> at sad movies.", sentencePast: "She <b>wept</b> when she heard the news.", gif: "crying" },
  { present: "wet", past: "wet", participle: "wet", type: "irregular", sound: "", sentencePres: "Don't <b>wet</b> the books, please.", sentencePast: "The rain <b>wet</b> all our clothes.", gif: "water" },
  { present: "wind", past: "wound", participle: "wound", type: "irregular", sound: "", sentencePres: "Old clocks <b>wind</b> with a small key.", sentencePast: "The road <b>wound</b> through the mountains.", gif: "winding" },
  { present: "withdraw", past: "withdrew", participle: "withdrawn", type: "irregular", sound: "", sentencePres: "People <b>withdraw</b> cash from ATMs daily.", sentencePast: "He <b>withdrew</b> a hundred dollars yesterday.", gif: "atm" },
  { present: "wring", past: "wrung", participle: "wrung", type: "irregular", sound: "", sentencePres: "Please <b>wring</b> the towel before hanging it.", sentencePast: "She <b>wrung</b> the wet shirt over the sink.", gif: "wringing" },
  { present: "date", past: "dated", participle: "dated", type: "regular", sound: "/id/", sentencePres: "Many couples <b>date</b> for years before marriage.", sentencePast: "They <b>dated</b> for two years in college.", gif: "dating" },
  { present: "end", past: "ended", participle: "ended", type: "regular", sound: "/id/", sentencePres: "All good things <b>end</b> at some point.", sentencePast: "The class <b>ended</b> ten minutes ago.", gif: "ending" },
  { present: "expect", past: "expected", participle: "expected", type: "regular", sound: "/id/", sentencePres: "Parents <b>expect</b> the best from their children.", sentencePast: "We <b>expected</b> a much bigger crowd.", gif: "waiting" },
  { present: "intend", past: "intended", participle: "intended", type: "regular", sound: "/id/", sentencePres: "I <b>intend</b> to study harder this year.", sentencePast: "He <b>intended</b> to call you yesterday.", gif: "thinking" },
  { present: "plant", past: "planted", participle: "planted", type: "regular", sound: "/id/", sentencePres: "Gardeners <b>plant</b> flowers every spring.", sentencePast: "We <b>planted</b> a tree in the backyard.", gif: "planting" },
  { present: "point", past: "pointed", participle: "pointed", type: "regular", sound: "/id/", sentencePres: "Don't <b>point</b> at people, it's rude.", sentencePast: "She <b>pointed</b> to the perfect answer.", gif: "pointing" },
  { present: "rent", past: "rented", participle: "rented", type: "regular", sound: "/id/", sentencePres: "Many students <b>rent</b> small apartments.", sentencePast: "We <b>rented</b> a cabin near the lake.", gif: "house" },
  { present: "repeat", past: "repeated", participle: "repeated", type: "regular", sound: "/id/", sentencePres: "Could you please <b>repeat</b> the question?", sentencePast: "He <b>repeated</b> the same joke three times.", gif: "repeat" },
  { present: "resist", past: "resisted", participle: "resisted", type: "regular", sound: "/id/", sentencePres: "It is hard to <b>resist</b> chocolate cake.", sentencePast: "She <b>resisted</b> the temptation to quit.", gif: "no" },
  { present: "wait", past: "waited", participle: "waited", type: "regular", sound: "/id/", sentencePres: "Please <b>wait</b> in line patiently.", sentencePast: "We <b>waited</b> two hours at the airport.", gif: "waiting" },
  { present: "dress", past: "dressed", participle: "dressed", type: "regular", sound: "/t/", sentencePres: "I <b>dress</b> nicely for important meetings.", sentencePast: "She <b>dressed</b> up for the wedding.", gif: "dressing" },
  { present: "erase", past: "erased", participle: "erased", type: "regular", sound: "/t/", sentencePres: "Please <b>erase</b> the board after class.", sentencePast: "He <b>erased</b> the file by mistake.", gif: "erasing" },
  { present: "jump", past: "jumped", participle: "jumped", type: "regular", sound: "/t/", sentencePres: "Kangaroos <b>jump</b> very far in one bound.", sentencePast: "The cat <b>jumped</b> onto the table.", gif: "jumping" },
  { present: "like", past: "liked", participle: "liked", type: "regular", sound: "/t/", sentencePres: "Most kids <b>like</b> chocolate ice cream.", sentencePast: "She <b>liked</b> the present I gave her.", gif: "thumbs up" },
  { present: "miss", past: "missed", participle: "missed", type: "regular", sound: "/t/", sentencePres: "I always <b>miss</b> my family during long trips.", sentencePast: "He <b>missed</b> the bus this morning.", gif: "sad" },
  { present: "practice", past: "practiced", participle: "practiced", type: "regular", sound: "/t/", sentencePres: "Athletes <b>practice</b> almost every single day.", sentencePast: "She <b>practiced</b> piano for two hours.", gif: "practice" },
  { present: "push", past: "pushed", participle: "pushed", type: "regular", sound: "/t/", sentencePres: "Please <b>push</b> the door, don't pull.", sentencePast: "He <b>pushed</b> the cart up the hill.", gif: "pushing" },
  { present: "shop", past: "shopped", participle: "shopped", type: "regular", sound: "/t/", sentencePres: "We usually <b>shop</b> on Saturday mornings.", sentencePast: "They <b>shopped</b> for hours at the mall.", gif: "shopping" },
  { present: "smoke", past: "smoked", participle: "smoked", type: "regular", sound: "/t/", sentencePres: "Please don't <b>smoke</b> inside the building.", sentencePast: "He <b>smoked</b> for many years before quitting.", gif: "smoke" },
  { present: "stop", past: "stopped", participle: "stopped", type: "regular", sound: "/t/", sentencePres: "Drivers must <b>stop</b> at every red light.", sentencePast: "The rain finally <b>stopped</b> at noon.", gif: "stop" },
  { present: "use", past: "used", participle: "used", type: "regular", sound: "/t/", sentencePres: "Most people <b>use</b> their phones every day.", sentencePast: "He <b>used</b> my computer yesterday.", gif: "using" },
  { present: "wash", past: "washed", participle: "washed", type: "regular", sound: "/t/", sentencePres: "I <b>wash</b> my hands before every meal.", sentencePast: "She <b>washed</b> the dishes after dinner.", gif: "washing" },
  { present: "wish", past: "wished", participle: "wished", type: "regular", sound: "/t/", sentencePres: "Children <b>wish</b> for new toys at Christmas.", sentencePast: "She <b>wished</b> me good luck on the test.", gif: "wishing" },
  { present: "arrive", past: "arrived", participle: "arrived", type: "regular", sound: "/d/", sentencePres: "Trains usually <b>arrive</b> right on time.", sentencePast: "We <b>arrived</b> at the hotel very late.", gif: "arriving" },
  { present: "belong", past: "belonged", participle: "belonged", type: "regular", sound: "/d/", sentencePres: "These books <b>belong</b> to the library.", sentencePast: "That bag <b>belonged</b> to my grandmother.", gif: "belonging" },
  { present: "change", past: "changed", participle: "changed", type: "regular", sound: "/d/", sentencePres: "Plans often <b>change</b> at the last minute.", sentencePast: "He <b>changed</b> his mind about the trip.", gif: "changing" },
  { present: "climb", past: "climbed", participle: "climbed", type: "regular", sound: "/d/", sentencePres: "Monkeys can <b>climb</b> trees very quickly.", sentencePast: "We <b>climbed</b> the mountain last summer.", gif: "climbing" },
  { present: "close", past: "closed", participle: "closed", type: "regular", sound: "/d/", sentencePres: "Please <b>close</b> the window, it's cold.", sentencePast: "The store <b>closed</b> early last night.", gif: "closing" },
  { present: "consider", past: "considered", participle: "considered", type: "regular", sound: "/d/", sentencePres: "I <b>consider</b> her my best friend.", sentencePast: "He <b>considered</b> moving to another city.", gif: "thinking" },
  { present: "dare", past: "dared", participle: "dared", type: "regular", sound: "/d/", sentencePres: "Few people <b>dare</b> to speak up in meetings.", sentencePast: "She <b>dared</b> to jump from the high diving board.", gif: "brave" },
  { present: "deliver", past: "delivered", participle: "delivered", type: "regular", sound: "/d/", sentencePres: "Postmen <b>deliver</b> letters every day.", sentencePast: "They <b>delivered</b> the package this morning.", gif: "delivery" },
  { present: "enjoy", past: "enjoyed", participle: "enjoyed", type: "regular", sound: "/d/", sentencePres: "I really <b>enjoy</b> long walks in the park.", sentencePast: "We <b>enjoyed</b> the concert very much.", gif: "happy" },
  { present: "fill", past: "filled", participle: "filled", type: "regular", sound: "/d/", sentencePres: "Please <b>fill</b> the bottle with cold water.", sentencePast: "He <b>filled</b> the form with his details.", gif: "filling" },
  { present: "follow", past: "followed", participle: "followed", type: "regular", sound: "/d/", sentencePres: "Drivers must <b>follow</b> the traffic rules.", sentencePast: "She <b>followed</b> me to the parking lot.", gif: "following" },
  { present: "hurry", past: "hurried", participle: "hurried", type: "regular", sound: "/d/", sentencePres: "Please <b>hurry</b> or we will miss the bus.", sentencePast: "He <b>hurried</b> to finish the report.", gif: "running" },
  { present: "live", past: "lived", participle: "lived", type: "regular", sound: "/d/", sentencePres: "Many artists <b>live</b> in small studios.", sentencePast: "She <b>lived</b> in Paris for five years.", gif: "house" },
  { present: "name", past: "named", participle: "named", type: "regular", sound: "/d/", sentencePres: "Parents <b>name</b> their babies with care.", sentencePast: "They <b>named</b> the dog Max.", gif: "name tag" },
  { present: "order", past: "ordered", participle: "ordered", type: "regular", sound: "/d/", sentencePres: "Customers <b>order</b> food on the app.", sentencePast: "He <b>ordered</b> a pizza for dinner.", gif: "ordering" },
  { present: "plan", past: "planned", participle: "planned", type: "regular", sound: "/d/", sentencePres: "We always <b>plan</b> our vacations carefully.", sentencePast: "They <b>planned</b> a surprise party for him.", gif: "planning" },
  { present: "rain", past: "rained", participle: "rained", type: "regular", sound: "/d/", sentencePres: "It usually <b>rains</b> a lot in April.", sentencePast: "It <b>rained</b> all weekend long.", gif: "rain" },
  { present: "remember", past: "remembered", participle: "remembered", type: "regular", sound: "/d/", sentencePres: "I always <b>remember</b> my friends' birthdays.", sentencePast: "She <b>remembered</b> to lock the door.", gif: "memory" },
  { present: "study", past: "studied", participle: "studied", type: "regular", sound: "/d/", sentencePres: "Good students <b>study</b> a little every day.", sentencePast: "He <b>studied</b> all night for the exam.", gif: "studying" },
  { present: "travel", past: "traveled", participle: "traveled", type: "regular", sound: "/d/", sentencePres: "Many young people <b>travel</b> after college.", sentencePast: "We <b>traveled</b> across Europe last summer.", gif: "traveling" },
  { present: "try", past: "tried", participle: "tried", type: "regular", sound: "/d/", sentencePres: "Please <b>try</b> your best on the exam.", sentencePast: "She <b>tried</b> a new recipe for dinner.", gif: "trying" },
  { present: "turn", past: "turned", participle: "turned", type: "regular", sound: "/d/", sentencePres: "Cars must <b>turn</b> right at the next corner.", sentencePast: "He <b>turned</b> off the lights before bed.", gif: "turning" },
];

const GIPHY_KEY = window.GIPHY_KEY || "2axlHmd0ojKiliZf0zstiEFAfdrjDrSd";
const VERB_IPA = {
  bear: { pres: "/bɛr/", past: "/bɔːr/" },
  buy: { pres: "/baɪ/", past: "/bɔːt/" },
  drive: { pres: "/draɪv/", past: "/droʊv/" },
  eat: { pres: "/iːt/", past: "/eɪt/" },
  find: { pres: "/faɪnd/", past: "/faʊnd/" },
  grow: { pres: "/ɡroʊ/", past: "/ɡruː/" },
  have: { pres: "/hæv/", past: "/hæd/" },
  know: { pres: "/noʊ/", past: "/nuː/" },
  lose: { pres: "/luːz/", past: "/lɔːst/" },
  meet: { pres: "/miːt/", past: "/mɛt/" },
  read: { pres: "/riːd/", past: "/rɛd/" },
  speak: { pres: "/spiːk/", past: "/spoʊk/" },
  swim: { pres: "/swɪm/", past: "/swæm/" },
  take: { pres: "/teɪk/", past: "/tʊk/" },
  write: { pres: "/raɪt/", past: "/roʊt/" },
  visit: { pres: "/ˈvɪzɪt/", past: "/ˈvɪzɪtɪd/" },
  paint: { pres: "/peɪnt/", past: "/ˈpeɪntɪd/" },
  cook: { pres: "/kʊk/", past: "/kʊkt/" },
  talk: { pres: "/tɔːk/", past: "/tɔːkt/" },
  walk: { pres: "/wɔːk/", past: "/wɔːkt/" },
  work: { pres: "/wɜːrk/", past: "/wɜːrkt/" },
  watch: { pres: "/wɑːtʃ/", past: "/wɑːtʃt/" },
  laugh: { pres: "/læf/", past: "/læft/" },
  listen: { pres: "/ˈlɪsən/", past: "/ˈlɪsənd/" },
  play: { pres: "/pleɪ/", past: "/pleɪd/" },
  call: { pres: "/kɔːl/", past: "/kɔːld/" },
  arise: { pres: "/əˈraɪz/", past: "/əˈroʊz/" },
  awake: { pres: "/əˈweɪk/", past: "/əˈwoʊk/" },
  be: { pres: "/biː/", past: "/wʌz/ / /wɜːr/" },
  beat: { pres: "/biːt/", past: "/biːt/" },
  become: { pres: "/bɪˈkʌm/", past: "/bɪˈkeɪm/" },
  begin: { pres: "/bɪˈɡɪn/", past: "/bɪˈɡæn/" },
  bend: { pres: "/bɛnd/", past: "/bɛnt/" },
  bet: { pres: "/bɛt/", past: "/bɛt/" },
  bite: { pres: "/baɪt/", past: "/bɪt/" },
  blow: { pres: "/bloʊ/", past: "/bluː/" },
  break: { pres: "/breɪk/", past: "/broʊk/" },
  bring: { pres: "/brɪŋ/", past: "/brɔːt/" },
  choose: { pres: "/tʃuːz/", past: "/tʃoʊz/" },
  come: { pres: "/kʌm/", past: "/keɪm/" },
  cut: { pres: "/kʌt/", past: "/kʌt/" },
  do: { pres: "/duː/", past: "/dɪd/" },
  drink: { pres: "/drɪŋk/", past: "/dræŋk/" },
  fall: { pres: "/fɔːl/", past: "/fɛl/" },
  forget: { pres: "/fərˈɡɛt/", past: "/fərˈɡɑːt/" },
  get: { pres: "/ɡɛt/", past: "/ɡɑːt/" },
  give: { pres: "/ɡɪv/", past: "/ɡeɪv/" },
  go: { pres: "/ɡoʊ/", past: "/wɛnt/" },
  make: { pres: "/meɪk/", past: "/meɪd/" },
  see: { pres: "/siː/", past: "/sɔː/" },
  sing: { pres: "/sɪŋ/", past: "/sæŋ/" },
  sleep: { pres: "/sliːp/", past: "/slɛpt/" },
  think: { pres: "/θɪŋk/", past: "/θɔːt/" },
  win: { pres: "/wɪn/", past: "/wʌn/" },
  accept: { pres: "/əkˈsɛpt/", past: "/əkˈsɛptɪd/" },
  count: { pres: "/kaʊnt/", past: "/ˈkaʊntɪd/" },
  need: { pres: "/niːd/", past: "/ˈniːdɪd/" },
  start: { pres: "/stɑːrt/", past: "/ˈstɑːrtɪd/" },
  want: { pres: "/wɑːnt/", past: "/ˈwɑːntɪd/" },
  ask: { pres: "/æsk/", past: "/æskt/" },
  dance: { pres: "/dæns/", past: "/dænst/" },
  finish: { pres: "/ˈfɪnɪʃ/", past: "/ˈfɪnɪʃt/" },
  help: { pres: "/hɛlp/", past: "/hɛlpt/" },
  look: { pres: "/lʊk/", past: "/lʊkt/" },
  answer: { pres: "/ˈænsər/", past: "/ˈænsərd/" },
  clean: { pres: "/kliːn/", past: "/kliːnd/" },
  love: { pres: "/lʌv/", past: "/lʌvd/" },
  open: { pres: "/ˈoʊpən/", past: "/ˈoʊpənd/" },
  stay: { pres: "/steɪ/", past: "/steɪd/" },
  bid: { pres: "/bɪd/", past: "/bɪd/" },
  bind: { pres: "/baɪnd/", past: "/baʊnd/" },
  bleed: { pres: "/bliːd/", past: "/blɛd/" },
  breed: { pres: "/briːd/", past: "/brɛd/" },
  broadcast: { pres: "/ˈbrɔːdkæst/", past: "/ˈbrɔːdkæst/" },
  build: { pres: "/bɪld/", past: "/bɪlt/" },
  burn: { pres: "/bɜːrn/", past: "/bɜːrnt/" },
  burst: { pres: "/bɜːrst/", past: "/bɜːrst/" },
  cast: { pres: "/kæst/", past: "/kæst/" },
  catch: { pres: "/kætʃ/", past: "/kɔːt/" },
  cling: { pres: "/klɪŋ/", past: "/klʌŋ/" },
  cost: { pres: "/kɔːst/", past: "/kɔːst/" },
  creep: { pres: "/kriːp/", past: "/krɛpt/" },
  deal: { pres: "/diːl/", past: "/dɛlt/" },
  dig: { pres: "/dɪɡ/", past: "/dʌɡ/" },
  draw: { pres: "/drɔː/", past: "/druː/" },
  dream: { pres: "/driːm/", past: "/drɛmt/" },
  feed: { pres: "/fiːd/", past: "/fɛd/" },
  feel: { pres: "/fiːl/", past: "/fɛlt/" },
  fight: { pres: "/faɪt/", past: "/fɔːt/" },
  flee: { pres: "/fliː/", past: "/flɛd/" },
  fly: { pres: "/flaɪ/", past: "/fluː/" },
  forbid: { pres: "/fərˈbɪd/", past: "/fərˈbeɪd/" },
  forgive: { pres: "/fərˈɡɪv/", past: "/fərˈɡeɪv/" },
  freeze: { pres: "/friːz/", past: "/froʊz/" },
  grind: { pres: "/ɡraɪnd/", past: "/ɡraʊnd/" },
  hang: { pres: "/hæŋ/", past: "/hʌŋ/" },
  hear: { pres: "/hɪr/", past: "/hɜːrd/" },
  hide: { pres: "/haɪd/", past: "/hɪd/" },
  hit: { pres: "/hɪt/", past: "/hɪt/" },
  hold: { pres: "/hoʊld/", past: "/hɛld/" },
  hurt: { pres: "/hɜːrt/", past: "/hɜːrt/" },
  keep: { pres: "/kiːp/", past: "/kɛpt/" },
  kneel: { pres: "/niːl/", past: "/nɛlt/" },
  knit: { pres: "/nɪt/", past: "/nɪt/" },
  lay: { pres: "/leɪ/", past: "/leɪd/" },
  lead: { pres: "/liːd/", past: "/lɛd/" },
  lean: { pres: "/liːn/", past: "/lɛnt/" },
  leap: { pres: "/liːp/", past: "/lɛpt/" },
  learn: { pres: "/lɜːrn/", past: "/lɜːrnt/" },
  leave: { pres: "/liːv/", past: "/lɛft/" },
  lend: { pres: "/lɛnd/", past: "/lɛnt/" },
  let: { pres: "/lɛt/", past: "/lɛt/" },
  lie: { pres: "/laɪ/", past: "/leɪ/" },
  light: { pres: "/laɪt/", past: "/lɪt/" },
  mean: { pres: "/miːn/", past: "/mɛnt/" },
  mistake: { pres: "/mɪˈsteɪk/", past: "/mɪˈstʊk/" },
  overcome: { pres: "/ˌoʊvərˈkʌm/", past: "/ˌoʊvərˈkeɪm/" },
  pay: { pres: "/peɪ/", past: "/peɪd/" },
  put: { pres: "/pʊt/", past: "/pʊt/" },
  ride: { pres: "/raɪd/", past: "/roʊd/" },
  ring: { pres: "/rɪŋ/", past: "/ræŋ/" },
  rise: { pres: "/raɪz/", past: "/roʊz/" },
  run: { pres: "/rʌn/", past: "/ræn/" },
  say: { pres: "/seɪ/", past: "/sɛd/" },
  seek: { pres: "/siːk/", past: "/sɔːt/" },
  sell: { pres: "/sɛl/", past: "/soʊld/" },
  send: { pres: "/sɛnd/", past: "/sɛnt/" },
  set: { pres: "/sɛt/", past: "/sɛt/" },
  sew: { pres: "/soʊ/", past: "/soʊd/" },
  shake: { pres: "/ʃeɪk/", past: "/ʃʊk/" },
  shine: { pres: "/ʃaɪn/", past: "/ʃoʊn/" },
  shoot: { pres: "/ʃuːt/", past: "/ʃɑːt/" },
  show: { pres: "/ʃoʊ/", past: "/ʃoʊd/" },
  shrink: { pres: "/ʃrɪŋk/", past: "/ʃræŋk/" },
  shut: { pres: "/ʃʌt/", past: "/ʃʌt/" },
  sink: { pres: "/sɪŋk/", past: "/sæŋk/" },
  sit: { pres: "/sɪt/", past: "/sæt/" },
  slide: { pres: "/slaɪd/", past: "/slɪd/" },
  smell: { pres: "/smɛl/", past: "/smɛlt/" },
  sow: { pres: "/soʊ/", past: "/soʊd/" },
  speed: { pres: "/spiːd/", past: "/spɛd/" },
  spell: { pres: "/spɛl/", past: "/spɛlt/" },
  spend: { pres: "/spɛnd/", past: "/spɛnt/" },
  spill: { pres: "/spɪl/", past: "/spɪlt/" },
  spin: { pres: "/spɪn/", past: "/spʌn/" },
  spit: { pres: "/spɪt/", past: "/spæt/" },
  split: { pres: "/splɪt/", past: "/splɪt/" },
  spoil: { pres: "/spɔɪl/", past: "/spɔɪlt/" },
  spread: { pres: "/sprɛd/", past: "/sprɛd/" },
  spring: { pres: "/sprɪŋ/", past: "/spræŋ/" },
  stand: { pres: "/stænd/", past: "/stʊd/" },
  steal: { pres: "/stiːl/", past: "/stoʊl/" },
  stick: { pres: "/stɪk/", past: "/stʌk/" },
  sting: { pres: "/stɪŋ/", past: "/stʌŋ/" },
  stink: { pres: "/stɪŋk/", past: "/stæŋk/" },
  stride: { pres: "/straɪd/", past: "/stroʊd/" },
  strike: { pres: "/straɪk/", past: "/strʌk/" },
  swear: { pres: "/swɛr/", past: "/swɔːr/" },
  sweat: { pres: "/swɛt/", past: "/swɛt/" },
  sweep: { pres: "/swiːp/", past: "/swɛpt/" },
  swell: { pres: "/swɛl/", past: "/swɛld/" },
  swing: { pres: "/swɪŋ/", past: "/swʌŋ/" },
  teach: { pres: "/tiːtʃ/", past: "/tɔːt/" },
  tear: { pres: "/tɛr/", past: "/tɔːr/" },
  tell: { pres: "/tɛl/", past: "/toʊld/" },
  throw: { pres: "/θroʊ/", past: "/θruː/" },
  thrust: { pres: "/θrʌst/", past: "/θrʌst/" },
  tread: { pres: "/trɛd/", past: "/trɑːd/" },
  understand: { pres: "/ˌʌndərˈstænd/", past: "/ˌʌndərˈstʊd/" },
  undergo: { pres: "/ˌʌndərˈɡoʊ/", past: "/ˌʌndərˈwɛnt/" },
  undertake: { pres: "/ˌʌndərˈteɪk/", past: "/ˌʌndərˈtʊk/" },
  wake: { pres: "/weɪk/", past: "/woʊk/" },
  wear: { pres: "/wɛr/", past: "/wɔːr/" },
  weave: { pres: "/wiːv/", past: "/woʊv/" },
  weep: { pres: "/wiːp/", past: "/wɛpt/" },
  wet: { pres: "/wɛt/", past: "/wɛt/" },
  wind: { pres: "/waɪnd/", past: "/waʊnd/" },
  withdraw: { pres: "/wɪðˈdrɔː/", past: "/wɪðˈdruː/" },
  wring: { pres: "/rɪŋ/", past: "/rʌŋ/" },
  date: { pres: "/deɪt/", past: "/ˈdeɪtɪd/" },
  end: { pres: "/ɛnd/", past: "/ˈɛndɪd/" },
  expect: { pres: "/ɪkˈspɛkt/", past: "/ɪkˈspɛktɪd/" },
  intend: { pres: "/ɪnˈtɛnd/", past: "/ɪnˈtɛndɪd/" },
  plant: { pres: "/plænt/", past: "/ˈplæntɪd/" },
  point: { pres: "/pɔɪnt/", past: "/ˈpɔɪntɪd/" },
  rent: { pres: "/rɛnt/", past: "/ˈrɛntɪd/" },
  repeat: { pres: "/rɪˈpiːt/", past: "/rɪˈpiːtɪd/" },
  resist: { pres: "/rɪˈzɪst/", past: "/rɪˈzɪstɪd/" },
  wait: { pres: "/weɪt/", past: "/ˈweɪtɪd/" },
  dress: { pres: "/drɛs/", past: "/drɛst/" },
  erase: { pres: "/ɪˈreɪs/", past: "/ɪˈreɪst/" },
  jump: { pres: "/dʒʌmp/", past: "/dʒʌmpt/" },
  like: { pres: "/laɪk/", past: "/laɪkt/" },
  miss: { pres: "/mɪs/", past: "/mɪst/" },
  practice: { pres: "/ˈpræktɪs/", past: "/ˈpræktɪst/" },
  push: { pres: "/pʊʃ/", past: "/pʊʃt/" },
  shop: { pres: "/ʃɑːp/", past: "/ʃɑːpt/" },
  smoke: { pres: "/smoʊk/", past: "/smoʊkt/" },
  stop: { pres: "/stɑːp/", past: "/stɑːpt/" },
  use: { pres: "/juːz/", past: "/juːzd/" },
  wash: { pres: "/wɑːʃ/", past: "/wɑːʃt/" },
  wish: { pres: "/wɪʃ/", past: "/wɪʃt/" },
  arrive: { pres: "/əˈraɪv/", past: "/əˈraɪvd/" },
  belong: { pres: "/bɪˈlɔːŋ/", past: "/bɪˈlɔːŋd/" },
  change: { pres: "/tʃeɪndʒ/", past: "/tʃeɪndʒd/" },
  climb: { pres: "/klaɪm/", past: "/klaɪmd/" },
  close: { pres: "/kloʊz/", past: "/kloʊzd/" },
  consider: { pres: "/kənˈsɪdər/", past: "/kənˈsɪdərd/" },
  dare: { pres: "/dɛr/", past: "/dɛrd/" },
  deliver: { pres: "/dɪˈlɪvər/", past: "/dɪˈlɪvərd/" },
  enjoy: { pres: "/ɪnˈdʒɔɪ/", past: "/ɪnˈdʒɔɪd/" },
  fill: { pres: "/fɪl/", past: "/fɪld/" },
  follow: { pres: "/ˈfɑːloʊ/", past: "/ˈfɑːloʊd/" },
  hurry: { pres: "/ˈhɜːri/", past: "/ˈhɜːrid/" },
  live: { pres: "/lɪv/", past: "/lɪvd/" },
  name: { pres: "/neɪm/", past: "/neɪmd/" },
  order: { pres: "/ˈɔːrdər/", past: "/ˈɔːrdərd/" },
  plan: { pres: "/plæn/", past: "/plænd/" },
  rain: { pres: "/reɪn/", past: "/reɪnd/" },
  remember: { pres: "/rɪˈmɛmbər/", past: "/rɪˈmɛmbərd/" },
  study: { pres: "/ˈstʌdi/", past: "/ˈstʌdid/" },
  travel: { pres: "/ˈtrævəl/", past: "/ˈtrævəld/" },
  try: { pres: "/traɪ/", past: "/traɪd/" },
  turn: { pres: "/tɜːrn/", past: "/tɜːrnd/" },
};

const VERB_MEANINGS_ES = {
  bear: "soportar", buy: "comprar", drive: "conducir", eat: "comer", find: "encontrar",
  grow: "crecer", have: "tener", know: "saber / conocer", lose: "perder", meet: "conocer / reunirse",
  read: "leer", speak: "hablar", swim: "nadar", take: "tomar / llevar", write: "escribir",
  visit: "visitar", paint: "pintar", cook: "cocinar", talk: "hablar", walk: "caminar",
  work: "trabajar", watch: "mirar / ver", laugh: "reír", listen: "escuchar", play: "jugar / tocar",
  call: "llamar", arise: "surgir", awake: "despertar", be: "ser / estar", beat: "golpear / vencer",
  become: "convertirse", begin: "empezar", bend: "doblar", bet: "apostar", bite: "morder",
  blow: "soplar", break: "romper", bring: "traer", choose: "elegir", come: "venir", cut: "cortar",
  do: "hacer", drink: "beber", fall: "caer", forget: "olvidar", get: "obtener / conseguir",
  give: "dar", go: "ir", make: "hacer", see: "ver", sing: "cantar", sleep: "dormir", think: "pensar",
  win: "ganar", accept: "aceptar", count: "contar", need: "necesitar", start: "empezar / iniciar",
  want: "querer", ask: "preguntar", dance: "bailar", finish: "terminar", help: "ayudar", look: "mirar",
  answer: "responder", clean: "limpiar", love: "amar", open: "abrir", stay: "quedarse",
  bid: "pujar / ofertar",
  bind: "atar / encuadernar",
  bleed: "sangrar",
  breed: "criar",
  broadcast: "transmitir / radiar",
  build: "construir / edificar",
  burn: "quemar",
  burst: "reventar / estallar",
  cast: "arrojar / lanzar",
  catch: "atrapar / coger",
  cling: "agarrarse / aferrarse",
  cost: "costar",
  creep: "arrastrarse / acercarse sigilosamente",
  deal: "tratar / repartir",
  dig: "cavar / excavar",
  draw: "dibujar",
  dream: "soñar",
  feed: "alimentar",
  feel: "sentir",
  fight: "luchar / pelear",
  flee: "huir",
  fly: "volar",
  forbid: "prohibir",
  forgive: "perdonar",
  freeze: "congelar / helar",
  grind: "moler",
  hang: "colgar",
  hear: "oír",
  hide: "esconder / ocultar",
  hit: "golpear / pegar",
  hold: "sostener / agarrar",
  hurt: "herir / doler",
  keep: "conservar / guardar",
  kneel: "arrodillarse",
  knit: "tejer",
  lay: "poner / colocar",
  lead: "guiar / liderar",
  lean: "apoyarse / inclinarse",
  leap: "saltar / brincar",
  learn: "aprender",
  leave: "salir / dejar",
  lend: "prestar",
  let: "permitir / dejar",
  lie: "echarse / yacer",
  light: "encender / iluminar",
  mean: "significar",
  mistake: "equivocar / confundir",
  overcome: "superar / vencer",
  pay: "pagar",
  put: "poner / colocar",
  ride: "montar / cabalgar",
  ring: "sonar / llamar",
  rise: "levantarse / subir",
  run: "correr",
  say: "decir",
  seek: "buscar",
  sell: "vender",
  send: "enviar",
  set: "poner / colocar",
  sew: "coser",
  shake: "sacudir / temblar",
  shine: "brillar",
  shoot: "disparar",
  show: "mostrar",
  shrink: "encogerse",
  shut: "cerrar",
  sink: "hundir / hundirse",
  sit: "sentarse",
  slide: "deslizar / resbalar",
  smell: "oler",
  sow: "sembrar",
  speed: "acelerar / ir rápido",
  spell: "deletrear",
  spend: "gastar / pasar tiempo",
  spill: "derramar",
  spin: "girar / hilar",
  spit: "escupir",
  split: "dividir / partir",
  spoil: "estropear / arruinar",
  spread: "extender / esparcir",
  spring: "saltar / brotar",
  stand: "estar de pie",
  steal: "robar",
  stick: "pegar / atascarse",
  sting: "picar",
  stink: "apestar",
  stride: "andar a zancadas",
  strike: "golpear",
  swear: "jurar",
  sweat: "sudar",
  sweep: "barrer",
  swell: "hinchar",
  swing: "balancear / columpiarse",
  teach: "enseñar",
  tear: "rasgar / romper",
  tell: "decir / contar",
  throw: "lanzar / tirar",
  thrust: "empujar / introducir",
  tread: "pisar",
  understand: "entender / comprender",
  undergo: "sufrir / experimentar",
  undertake: "emprender / asumir",
  wake: "despertar",
  wear: "llevar puesto / vestir",
  weave: "tejer / entrelazar",
  weep: "llorar",
  wet: "mojar",
  wind: "enrollar / serpentear",
  withdraw: "retirar",
  wring: "escurrir / torcer",
  date: "salir con / fechar",
  end: "terminar",
  expect: "esperar / suponer",
  intend: "intentar / pretender",
  plant: "plantar / sembrar",
  point: "señalar / apuntar",
  rent: "alquilar / rentar",
  repeat: "repetir",
  resist: "resistir",
  wait: "esperar",
  dress: "vestir / vestirse",
  erase: "borrar",
  jump: "saltar",
  like: "gustar",
  miss: "extrañar / perder",
  practice: "practicar",
  push: "empujar",
  shop: "comprar / ir de compras",
  smoke: "fumar",
  stop: "parar / detener",
  use: "usar",
  wash: "lavar",
  wish: "desear",
  arrive: "llegar",
  belong: "pertenecer",
  change: "cambiar",
  climb: "escalar / trepar",
  close: "cerrar",
  consider: "considerar",
  dare: "atreverse / desafiar",
  deliver: "entregar",
  enjoy: "disfrutar",
  fill: "llenar",
  follow: "seguir",
  hurry: "apurarse / darse prisa",
  live: "vivir",
  name: "nombrar",
  order: "ordenar / pedir",
  plan: "planear",
  rain: "llover",
  remember: "recordar",
  study: "estudiar",
  travel: "viajar",
  try: "intentar / probar",
  turn: "girar / voltear",
};

/* ── RACHA DIARIA (streak) ─────────────────────────────────
   Persistencia 100% local con localStorage.
   - vfc_streak: número de días consecutivos
   - vfc_lastDate: YYYY-MM-DD del último día con actividad
   ───────────────────────────────────────────────────────── */
const STREAK_KEY = "vfc_streak";
const STREAK_DATE_KEY = "vfc_lastDate";

function _streakToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function _streakDaysBetween(a, b) {
  // Diferencia en días (b - a) usando solo la parte de fecha.
  const [ya, ma, da] = a.split("-").map(Number);
  const [yb, mb, db_] = b.split("-").map(Number);
  const da1 = Date.UTC(ya, ma - 1, da);
  const da2 = Date.UTC(yb, mb - 1, db_);
  return Math.round((da2 - da1) / (1000 * 60 * 60 * 24));
}

/**
 * Calcula y persiste la racha. Devuelve { streak, prev, kind }
 *   kind: "unlocked" | "incremented" | "kept" | "reset"
 */
function updateStreak() {
  const prev = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
  const last = localStorage.getItem(STREAK_DATE_KEY);
  const today = _streakToday();

  let streak = prev;
  let kind = "kept";

  if (!last || prev === 0) {
    // Primera vez en este dispositivo → desbloquea
    streak = 1;
    kind = (prev === 0) ? "unlocked" : "incremented";
  } else if (last === today) {
    if (streak < 1) { streak = 1; kind = "unlocked"; }
    else { kind = "kept"; }
  } else {
    const diff = _streakDaysBetween(last, today);
    if (diff === 1) {
      streak = prev + 1;
      kind = "incremented";
    } else if (diff > 1) {
      streak = 1;
      kind = "reset";
    } else {
      if (streak < 1) { streak = 1; kind = "unlocked"; }
      else { kind = "kept"; }
    }
  }

  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(STREAK_DATE_KEY, today);
  return { streak, prev, kind };
}

/* ── Streak milestones (used for the progressbar) ── */
const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 200, 365];

function _streakMilestoneInfo(n) {
  // Returns { prevMs, nextMs, pct }
  let prevMs = 0;
  let nextMs = STREAK_MILESTONES[0];
  for (let i = 0; i < STREAK_MILESTONES.length; i++) {
    if (n < STREAK_MILESTONES[i]) {
      nextMs = STREAK_MILESTONES[i];
      prevMs = i === 0 ? 0 : STREAK_MILESTONES[i - 1];
      break;
    }
    if (i === STREAK_MILESTONES.length - 1 && n >= STREAK_MILESTONES[i]) {
      // capped at the top
      prevMs = STREAK_MILESTONES[i - 1] || 0;
      nextMs = STREAK_MILESTONES[i];
    }
  }
  const span = Math.max(1, nextMs - prevMs);
  const into = Math.max(0, n - prevMs);
  const pct = Math.min(100, Math.round((into / span) * 100));
  return { prevMs, nextMs, pct };
}

function _setStreakNumText(n) {
  const el = document.getElementById("streakNum");
  if (el) el.textContent = String(n);
  const badge = document.getElementById("streakBadge");
  if (badge) {
    const lbl = n === 1 ? "1 día seguido" : `${n} días seguidos`;
    badge.title = `Llevas ${lbl} · Próxima meta: ${_streakMilestoneInfo(n).nextMs} días`;
    badge.setAttribute("aria-label", lbl);
  }
  // Update target text + progress bar
  const info = _streakMilestoneInfo(n);
  const tgt = document.getElementById("streakTarget");
  if (tgt) {
    if (n >= STREAK_MILESTONES[STREAK_MILESTONES.length - 1]) {
      tgt.textContent = "🏆 Leyenda";
    } else {
      tgt.textContent = `→ ${info.nextMs}`;
    }
  }
  const fill = document.getElementById("streakProgressFill");
  if (fill) fill.style.width = info.pct + "%";
}

function renderStreakBadge() {
  try {
    const { streak, prev, kind } = updateStreak();
    const badge = document.getElementById("streakBadge");
    if (!badge) return;
    badge.classList.add("show");
    _setStreakNumText(streak);

    if (kind === "unlocked") {
      // Pequeño retraso para que el resto de la UI esté lista
      setTimeout(() => celebrateStreak(streak, true), 380);
    } else if (kind === "incremented") {
      // Animación de incremento estilo Duolingo
      setTimeout(() => animateStreakIncrement(prev, streak), 320);
    } else if (kind === "reset" && prev > 0) {
      // Sutil indicador de reinicio (no celebración)
      badge.classList.add("streak-reset-flash");
      setTimeout(() => badge.classList.remove("streak-reset-flash"), 900);
    }

    // Notify the goals system that the streak might have changed
    if (typeof checkGoals === "function") {
      try { checkGoals({ silent: kind === "kept" }); } catch (e) { }
    }
  } catch (err) {
    // localStorage no disponible
  }
}

/* ── Celebración: nueva racha desbloqueada ── */
function celebrateStreak(n, isUnlock) {
  const overlay = document.getElementById("streakCelebrate");
  if (!overlay) return;

  document.getElementById("streakCounterNum").textContent = String(n);
  document.getElementById("streakCounterLbl").textContent = (n === 1 ? "día" : "días seguidos");

  const titleEl = document.getElementById("streakCelebrateTitle");
  const msgEl = document.getElementById("streakCelebrateMsg");
  if (isUnlock) {
    titleEl.textContent = "¡Racha desbloqueada!";
    msgEl.textContent = "Empezaste tu camino diario. Vuelve mañana para sumar otro día.";
  } else {
    titleEl.textContent = "¡Racha en marcha!";
    msgEl.textContent = `Llevas ${n} ${n === 1 ? "día" : "días seguidos"} practicando.`;
  }

  // Generar confetti dinámico
  spawnStreakConfetti();

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";

  // Pulse del badge en sincronía
  const badge = document.getElementById("streakBadge");
  if (badge) {
    badge.classList.add("streak-bump");
    setTimeout(() => badge.classList.remove("streak-bump"), 900);
  }
}

function closeStreakCelebrate() {
  const overlay = document.getElementById("streakCelebrate");
  if (!overlay) return;
  overlay.classList.remove("show");
  document.body.style.overflow = "";
  const cf = document.getElementById("streakConfetti");
  if (cf) cf.innerHTML = "";
}

function spawnStreakConfetti() {
  const cf = document.getElementById("streakConfetti");
  if (!cf) return;
  cf.innerHTML = "";
  const colors = ["#ff6b35", "#ffb35a", "#ffd86b", "#7c5cfc", "#0dbfa0", "#f43f5e", "#fff"];
  const N = 32;
  for (let i = 0; i < N; i++) {
    const piece = document.createElement("span");
    piece.className = "streak-confetti-piece";
    const angle = (i / N) * 360 + (Math.random() - 0.5) * 14;
    const dist = 130 + Math.random() * 90;
    const dx = Math.cos(angle * Math.PI / 180) * dist;
    const dy = Math.sin(angle * Math.PI / 180) * dist;
    const rot = (Math.random() - 0.5) * 720;
    const dur = 0.9 + Math.random() * 0.7;
    const delay = Math.random() * 0.15;
    const size = 6 + Math.random() * 6;
    piece.style.setProperty("--dx", dx + "px");
    piece.style.setProperty("--dy", dy + "px");
    piece.style.setProperty("--rot", rot + "deg");
    piece.style.animationDuration = dur + "s";
    piece.style.animationDelay = delay + "s";
    piece.style.background = colors[i % colors.length];
    piece.style.width = size + "px";
    piece.style.height = (size * (0.55 + Math.random() * 0.5)) + "px";
    cf.appendChild(piece);
  }
}

/* ── Animación de incremento de racha (estilo Duolingo) ── */
function animateStreakIncrement(prev, next) {
  const badge = document.getElementById("streakBadge");
  const numEl = document.getElementById("streakNum");
  const fill = document.getElementById("streakProgressFill");
  const tgt = document.getElementById("streakTarget");
  if (!badge || !numEl) return;

  // Mostrar primero el número anterior y la barra al estado anterior
  numEl.textContent = String(prev);
  const prevInfo = _streakMilestoneInfo(prev);
  if (fill) fill.style.width = prevInfo.pct + "%";
  if (tgt) tgt.textContent = `→ ${prevInfo.nextMs}`;

  badge.classList.add("streak-fill-anim");

  // Burst de partículas alrededor del badge
  spawnStreakBurst(badge);

  // A mitad de animación, swap del número con flip + animar la barra al nuevo estado
  setTimeout(() => {
    numEl.classList.add("streak-num-flip");
    setTimeout(() => {
      numEl.textContent = String(next);
      const newInfo = _streakMilestoneInfo(next);
      if (fill) fill.style.width = newInfo.pct + "%";
      if (tgt) {
        if (next >= STREAK_MILESTONES[STREAK_MILESTONES.length - 1]) {
          tgt.textContent = "🏆 Leyenda";
        } else {
          tgt.textContent = `→ ${newInfo.nextMs}`;
        }
      }
    }, 180);
    setTimeout(() => {
      numEl.classList.remove("streak-num-flip");
    }, 420);
  }, 380);

  setTimeout(() => {
    badge.classList.remove("streak-fill-anim");
  }, 1500);
}

function spawnStreakBurst(anchorEl) {
  if (!anchorEl) return;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const layer = document.createElement("div");
  layer.className = "streak-burst-layer";
  document.body.appendChild(layer);
  const colors = ["#ff6b35", "#ffb35a", "#ffd86b", "#fff"];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const p = document.createElement("span");
    p.className = "streak-burst-particle";
    const angle = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 50 + Math.random() * 40;
    p.style.left = cx + "px";
    p.style.top = cy + "px";
    p.style.setProperty("--bx", Math.cos(angle) * dist + "px");
    p.style.setProperty("--by", Math.sin(angle) * dist + "px");
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.08) + "s";
    layer.appendChild(p);
  }
  setTimeout(() => layer.remove(), 1400);
}

/* ── FLASHCARD STATE ── */
let deck = [];
let cursor = 0;
let isFlipped = false;
let correct = 0;
let skipped = 0;
let currentFilter = "all";

/* ── PRÁCTICA DE ERRORES (round) ── */
let skippedDeck = [];   // verbos marcados como skipped en la ronda actual
let practiceMode = false; // true cuando estamos repasando los skipped
let originalDeckLen = 0;     // tamaño del mazo original (para el resumen final)

/* ── HELPERS ── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function colorIdx(verb) { return ALL_VERBS.indexOf(verb) % 10; }

/* Audio playback speed (1 = normal). Persisted across the session. */
let currentSpeed = 1;

/**
 * Speak a phrase using the Web Speech API.
 *  - text: string to read
 *  - opts.rate: "normal" | "slow" | number (overrides currentSpeed)
 *  - opts.lang: BCP-47 (defaults to en-US)
 */
function speakVerb(text, opts) {
  if (!("speechSynthesis" in window) || !text) return;
  opts = opts || {};
  let rate;
  if (typeof opts.rate === "number") {
    rate = opts.rate;
  } else if (opts.rate === "slow") {
    rate = Math.max(0.35, currentSpeed * 0.55);
  } else {
    rate = currentSpeed;
  }
  // Web Speech rate is clamped 0.1–2. Stay in safe range.
  rate = Math.min(2, Math.max(0.3, rate));

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts.lang || "en-US";
  utter.rate = rate;
  utter.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

/* Strip simple HTML to get clean text for TTS (removes <b>, etc.) */
function stripHtml(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html || "";
  return (tmp.textContent || tmp.innerText || "").trim();
}

function hideSwipeGhosts() {
  const ok = document.getElementById("qGhostOk");
  const no = document.getElementById("qGhostNo");
  if (ok) { ok.style.opacity = "0"; ok.textContent = ""; }
  if (no) { no.style.opacity = "0"; no.textContent = ""; }
}

function hideActions() {
  document.getElementById("actions").classList.remove("visible");
}

/* ── SHARE RESULTS ── */
function showShareToast(msg) {
  const toast = document.getElementById("shareToast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showShareToast._t);
  showShareToast._t = setTimeout(() => toast.classList.remove("show"), 2600);
}

function buildShareText(kind) {
  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : "";
  if (kind === "quiz") {
    const total = quizOriginalTotal || quizQuestions.length || 0;
    const pct = total ? Math.round((quizOk / total) * 100) : 0;
    const emoji = pct >= 90 ? "🏆" : pct >= 70 ? "🎉" : pct >= 50 ? "💪" : "📚";
    return (
      `${emoji} Verb Flashcards – Final Quiz\n` +
      `✅ Correct: ${quizOk}/${total}\n` +
      `❌ Wrong:   ${quizNo}/${total}\n` +
      `🎯 Score:   ${pct}%\n` +
      (url ? `\nTry it: ${url}` : "")
    );
  }
  // round complete (flashcards)
  const total = originalDeckLen || deck.length || 0;
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
  return (
    `${emoji} Verb Flashcards – Round complete!\n` +
    `📚 Learned: ${correct}/${total}\n` +
    `⏭️ Skipped: ${skipped}/${total}\n` +
    `🎯 Mastery: ${pct}%\n` +
    (url ? `\nTry it: ${url}` : "")
  );
}

async function shareResults(kind) {
  const text = buildShareText(kind);
  const title = kind === "quiz" ? "My Final Quiz Results" : "My Flashcards Round";
  const url = (typeof location !== "undefined" && location.href) ? location.href.split("#")[0] : undefined;

  // 1. Try native Web Share API (mobile + some desktops)
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return;
    } catch (err) {
      // user cancelled or share failed; fall through to clipboard
      if (err && err.name === "AbortError") return;
    }
  }

  // 2. Fallback: copy to clipboard
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      showShareToast("Results copied to clipboard ✓");
      return;
    }
  } catch (err) { /* ignore */ }

  // 3. Last-resort fallback: legacy execCommand
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    showShareToast("Results copied to clipboard ✓");
  } catch (err) {
    showShareToast("Couldn't share – try selecting and copying manually.");
  }
}

/* ── DECK CON PROGRESIÓN DIARIA ── */
function updateDeck() {
  const today = new Date();
  const timeDiff = today - START_DATE;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const verbsToUnlock = Math.max(10, (daysDiff + 1) * 10);
  deck = ALL_VERBS.slice(0, Math.min(verbsToUnlock, ALL_VERBS.length));
}

function buildDeck() {
  updateDeck();
  const base = currentFilter === "all"
    ? deck
    : deck.filter(v => v.type === currentFilter);
  deck = shuffle(base);
  cursor = 0; correct = 0; skipped = 0; isFlipped = false;
  skippedDeck = [];
  practiceMode = false;
  originalDeckLen = deck.length;
}

/* ── RENDER CARD ── */
function renderCard(animate = true) {
  const verb = deck[cursor];
  document.getElementById("stage").style.display = "flex";
  document.getElementById("finishScreen").classList.remove("show");

  const scene = document.getElementById("cardScene");
  scene.className = `card-scene col-${colorIdx(verb)}`;

  document.getElementById("cardPresent").textContent = verb.present;
  document.getElementById("cardPast").textContent = verb.past;
  document.getElementById("cardPresentRef").textContent = `← ${verb.present}`;

  const badge = document.getElementById("cardBadge");
  badge.textContent = verb.type === "irregular" ? "Irregular" : "Regular";
  badge.className = "type-badge " + (verb.type === "irregular" ? "badge-irr" : "badge-reg");

  const pct = (cursor / deck.length) * 100;
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressLabel").textContent = `${cursor + 1} / ${deck.length}`;
  document.getElementById("scoreCorrect").textContent = correct;
  document.getElementById("scoreSkip").textContent = skipped;

  if (animate) {
    scene.classList.remove("animate");
    void scene.offsetWidth;
    scene.classList.add("animate");
  }
}

/* ── FLIP ── */
function toggleFlip() {
  const scene = document.getElementById("cardScene");
  isFlipped = !isFlipped;
  if (isFlipped) {
    scene.classList.add("flipped");
    document.getElementById("sideHint").textContent = "Past tense";
    setTimeout(() => { document.getElementById("actions").classList.add("visible"); }, 350);
  } else {
    scene.classList.remove("flipped");
    document.getElementById("sideHint").textContent = "Present tense";
    document.getElementById("actions").classList.remove("visible");
  }
}

/* ── NEXT CARD ── */
function next() {
  const scene = document.getElementById("cardScene");
  const cardInner = scene.querySelector(".card-inner");
  const backText = document.getElementById("cardPast");

  backText.style.visibility = "hidden";
  cardInner.style.transition = "none";
  scene.classList.remove("flipped");
  isFlipped = false;
  void cardInner.offsetWidth;
  cardInner.style.transition = "";

  document.getElementById("actions").classList.remove("visible");
  document.getElementById("sideHint").textContent = "Present tense";
  backText.textContent = "";
  cursor++;

  if (cursor >= deck.length) {
    backText.style.visibility = "visible";
    if (skippedDeck.length > 0) {
      // Vuelta de práctica: reordenar con los que quedan
      startPracticeRound();
      return;
    }
    // Todo dominado → mostrar finish
    practiceMode = false;
    showPracticePill(false);
    showFinish();
  } else {
    renderCard(true);
    backText.style.visibility = "visible";
  }
}

/* ── PRÁCTICA DE ERRORES ── */
function startPracticeRound() {
  // Reordena el deck con los pendientes y entra en modo práctica
  practiceMode = true;
  deck = shuffle(skippedDeck);
  cursor = 0;
  isFlipped = false;
  // Mostrar pill de modo práctica
  showPracticePill(true);
  renderCard(true);
}

function showPracticePill(show) {
  let pill = document.getElementById("practicePill");
  if (show) {
    if (!pill) {
      pill = document.createElement("div");
      pill.id = "practicePill";
      pill.className = "practice-banner practice-banner-round";
      pill.innerHTML = (
        '<span class="practice-banner-icon">🎯</span>' +
        '<div class="practice-banner-body">' +
        '<div class="practice-banner-title">Practicando errores</div>' +
        '<div class="practice-banner-sub">Domina cada verbo para terminar la ronda</div>' +
        '</div>' +
        '<div class="practice-banner-count"><b id="practiceCount">0</b><span>por dominar</span></div>'
      );
      const wrap = document.querySelector(".progress-wrap");
      wrap.parentNode.insertBefore(pill, wrap);
    }
    pill.classList.add("show");
    const cnt = document.getElementById("practiceCount");
    if (cnt) {
      const oldVal = parseInt(cnt.textContent || "0", 10);
      const newVal = skippedDeck.length;
      cnt.textContent = newVal;
      if (oldVal !== newVal) {
        cnt.classList.remove("count-bump");
        void cnt.offsetWidth;
        cnt.classList.add("count-bump");
      }
    }
  } else if (pill) {
    pill.classList.remove("show");
  }
}

/* ── FINISH ── */
function showFinish() {
  document.getElementById("stage").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("finishScreen").classList.add("show");
  // Goals: count this finished round, and check no-skip rounds
  if (typeof goalsOnRoundFinished === "function") {
    goalsOnRoundFinished({ skipped: skipped, correct: correct, total: (originalDeckLen || deck.length) });
  }

  const total = originalDeckLen || deck.length;
  const pct = Math.round((correct / Math.max(1, total)) * 100);
  document.getElementById("fCorrect").textContent = correct;
  document.getElementById("fSkip").textContent = skipped;
  document.getElementById("fTotal").textContent = total;
  document.getElementById("finishSubtitle").textContent =
    pct >= 80 ? "Excellent work! 🔥" : pct >= 50 ? "Good progress, keep going!" : "Keep practicing, you'll get there!";
  document.getElementById("finishEmoji").textContent =
    pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚";
  document.getElementById("progressFill").style.width = "100%";
  document.getElementById("progressLabel").textContent = `${total} / ${total}`;
}

/* ── DETAIL MODAL ── */
async function openDetail() {
  const verb = deck[cursor];
  const ipa = VERB_IPA[verb.present] || { pres: "", past: "" };

  // Hero words
  document.getElementById("modalPresent").textContent = verb.present;
  document.getElementById("modalPast").textContent = verb.past;
  document.getElementById("modalIpaPres").textContent = ipa.pres || "";
  document.getElementById("modalIpaPast").textContent = ipa.past || "";

  // Spanish meaning chip
  document.getElementById("modalMeaningChip").textContent =
    VERB_MEANINGS_ES[verb.present] || "Sin traducción disponible";

  // Examples
  document.getElementById("modalSentencePres").innerHTML = verb.sentencePres;
  document.getElementById("modalSentencePast").innerHTML = verb.sentencePast;

  // Pronunciation: a single "Escuchar" button per card. Rate is taken from currentSpeed.
  const presWord = verb.present;
  const pastWord = verb.past.split("/")[0].trim();
  document.querySelectorAll(".pron-btn").forEach(btn => {
    const form = btn.dataset.form;
    btn.onclick = (e) => {
      e.stopPropagation();
      const text = form === "pres" ? presWord : pastWord;
      // Visual feedback while playing
      btn.classList.add("is-playing");
      setTimeout(() => btn.classList.remove("is-playing"), 800);
      speakVerb(text);
    };
  });

  // Sentence play buttons
  document.getElementById("playSentencePres").onclick = (e) => {
    e.stopPropagation();
    speakVerb(stripHtml(verb.sentencePres));
  };
  document.getElementById("playSentencePast").onclick = (e) => {
    e.stopPropagation();
    speakVerb(stripHtml(verb.sentencePast));
  };

  // Badge with phonetic sound tag for regular verbs
  const badge = document.getElementById("modalBadge");
  if (verb.type === "irregular") {
    badge.textContent = "Irregular";
    badge.style.background = "var(--text)";
    badge.style.color = "var(--bg)";
  } else {
    badge.textContent = verb.sound ? `Regular · ${verb.sound}` : "Regular";
    badge.style.background = "var(--accent-soft)";
    badge.style.color = "var(--accent)";
  }

  // Reset speed UI to current value
  syncSpeedUI();

  const gifEl = document.getElementById("modalGif");
  gifEl.innerHTML = `<span class="gif-msg">Loading GIF…</span>`;
  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";

  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_KEY}&q=${encodeURIComponent(verb.gif)}&limit=6&rating=g`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) throw new Error("API Key inválida o expirada.");
      if (res.status === 429) throw new Error("Límite de GIFs alcanzado.");
      throw new Error("Error de conexión con Giphy.");
    }
    const json = await res.json();
    if (json.data?.length) {
      const pick = json.data[Math.floor(Math.random() * json.data.length)];
      gifEl.innerHTML = `<img src="${pick.images.fixed_height.url}" alt="${verb.gif}" />`;
    } else {
      gifEl.innerHTML = `<span class="gif-msg">No GIF found</span>`;
    }
  } catch (error) {
    gifEl.innerHTML = `<span class="gif-msg" style="color:red;text-transform:none;">Error: ${error.message}</span>`;
  }
}

function closeModal() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
  // Stop any in-progress speech when the user closes the modal
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

/* ── SPEED CONTROL (3 chips only: 0.7 / 1 / 1.2) ── */
const SPEED_KEY = "vfc_speed";
function setSpeed(value) {
  const v = Math.min(1.4, Math.max(0.4, parseFloat(value) || 1));
  currentSpeed = v;
  try { localStorage.setItem(SPEED_KEY, String(v)); } catch (e) { }
  syncSpeedUI();
}

function syncSpeedUI() {
  document.querySelectorAll(".speed-chip, .speed-preset").forEach(b => {
    const matches = Math.abs(parseFloat(b.dataset.speed) - currentSpeed) < 0.01;
    b.classList.toggle("active", matches);
    b.setAttribute("aria-checked", matches ? "true" : "false");
  });
}

/* Restore persisted speed (if any) on load */
(function restoreSpeed() {
  try {
    const saved = parseFloat(localStorage.getItem(SPEED_KEY));
    if (!isNaN(saved) && saved > 0) currentSpeed = Math.min(1.4, Math.max(0.4, saved));
  } catch (e) { }
})();

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

/* ── Get distractors ── */
function getDistractor(correctPast, pool) {
  return shuffle(pool.filter(v => v.past !== correctPast))[0].past;
}
function getDistractors(correctPast, pool) {
  return shuffle(pool.filter(v => v.past !== correctPast)).slice(0, 3).map(v => v.past);
}

/* ── Build question ── */
function buildQuestion(verb, pool) {
  const roll = Math.random();
  if (roll < 0.333) {
    const distractor = getDistractor(verb.past, pool);
    const correctOnRight = Math.random() > 0.5;
    return {
      mech: "swipe", label: "Swipe to the past tense", verb,
      leftOpt: correctOnRight ? distractor : verb.past,
      rightOpt: correctOnRight ? verb.past : distractor,
      correctSide: correctOnRight ? "right" : "left",
    };
  }
  if (roll < 0.666) {
    return { mech: "type", label: "Type the past tense", verb };
  }
  const opts = shuffle([verb.past, ...getDistractors(verb.past, pool)]);
  return { mech: "choice", label: "Pop the correct bubble", opts, correct: verb.past, verb };
}

function buildQuiz(verbPool) {
  return shuffle(verbPool).map(v => buildQuestion(v, verbPool));
}

/* ── Start quiz ── */
function startQuiz() {
  if (bubbleRAF) { cancelAnimationFrame(bubbleRAF); bubbleRAF = null; }
  updateDeck();
  const base = currentFilter === "all"
    ? ALL_VERBS.slice(0, deck.length)
    : ALL_VERBS.slice(0, deck.length).filter(v => v.type === currentFilter);

  quizQuestions = buildQuiz(base);
  quizIdx = 0; quizOk = 0; quizNo = 0; quizLocked = false;
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
    text: "Swipe to the correct past tense",
    color: "var(--accent-2)",
    bg: "var(--accent-2-soft)",
  },
  type: {
    icon: "⌨️",
    text: "Type the past tense &amp; press Enter",
    color: "var(--accent-3)",
    bg: "var(--accent-3-soft)",
  },
  choice: {
    icon: "🫧",
    text: "Pop the correct bubble!",
    color: "var(--accent)",
    bg: "var(--accent-soft)",
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
  if (q.mech === "choice") c1.classList.add("no-drag");
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
    `<span class="qlabel-text">${lbl.text}</span>` +
    `</span>`;

  if (q.mech === "swipe") {
    dirRow.style.display = "flex";
    body.innerHTML =
      `<div class="qsw-verb">${q.verb.present}</div>` +
      `<div class="qsw-sub">past tense</div>` +
      `<div class="qsw-opts">` +
      `<div class="qsw-opt" id="qOptL">${q.leftOpt}</div>` +
      `<div class="qsw-or">or</div>` +
      `<div class="qsw-opt" id="qOptR">${q.rightOpt}</div>` +
      `</div>`;

  } else if (q.mech === "type") {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qtype-verb">${q.verb.present}</div>` +
      `<div class="qtype-wrap">` +
      `<div class="qtype-tip">Write the past tense below</div>` +
      `<input id="qTypeInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="past tense…" />` +
      `<div class="qtype-fb" id="qTypeFb"></div>` +
      `</div>`;

    const inp = document.getElementById("qTypeInput");
    inp.addEventListener("keydown", function (e) {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (quizLocked) return;
      const val = this.value.trim().toLowerCase();
      const targets = q.verb.past.toLowerCase().split("/").map(s => s.trim());
      const isOk = targets.includes(val);
      this.className = isOk ? "right" : "wrong";
      const fb = document.getElementById("qTypeFb");
      fb.textContent = isOk ? "✓ Correct!" : "Answer: " + q.verb.past;
      fb.style.color = isOk ? "var(--quiz-ok)" : "var(--quiz-no)";
      this.disabled = true;
      quizLocked = true;
      registerQuizAnswer(q.verb, isOk);
      updateQuizHeader();
      animateToNextQuestion("up", 820);
    });
    setTimeout(() => { try { inp.focus(); } catch (e) { } }, 80);

  } else {
    dirRow.style.display = "none";
    body.innerHTML =
      `<div class="qbubble-wrap">` +
      `<div class="qbubble-verb">${q.verb.present}</div>` +
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
        '<span class="practice-banner-icon">🔁</span>' +
        '<div class="practice-banner-body">' +
        '<div class="practice-banner-title">Repasando fallados</div>' +
        '<div class="practice-banner-sub">Acierta cada uno para terminar el quiz</div>' +
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
  } else if (pill) {
    pill.classList.remove("show");
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
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  const qResultScreen = document.getElementById("quizResultScreen");
  if (qResultScreen) qResultScreen.classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  buildDeck();
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
}

/* ── THEME ── */
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme();
function applyTheme() {
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  document.getElementById("themeToggle").textContent = dark ? "☀︎" : "☾";
}

/* ════════════════════════════════════════════════════════
   E V E N T   L I S T E N E R S
   ════════════════════════════════════════════════════════ */

document.getElementById("cardScene").addEventListener("click", (e) => {
  if (e.target.closest("#actions")) return;
  toggleFlip();
});

document.getElementById("btnCorrect").addEventListener("click", (e) => {
  e.stopPropagation();
  if (practiceMode) {
    // En modo práctica: el verbo se domina y sale del set,
    // pero NO se le quita del contador "skipped" del resumen
    const v = deck[cursor];
    skippedDeck = skippedDeck.filter(x => x !== v);
    correct++;
    if (typeof goalsBumpRecoveredSkip === "function") goalsBumpRecoveredSkip();
  } else {
    correct++;
  }
  if (typeof goalsBumpLearned === "function") goalsBumpLearned();
  next();
});
document.getElementById("btnSkip").addEventListener("click", (e) => {
  e.stopPropagation();
  if (practiceMode) {
    // En modo práctica el skip se queda pendiente, no aumenta el total
  } else {
    const v = deck[cursor];
    if (!skippedDeck.includes(v)) skippedDeck.push(v);
    skipped++;
  }
  next();
});
document.getElementById("btnDetail").addEventListener("click", (e) => { e.stopPropagation(); openDetail(); });

document.getElementById("restartBtn").addEventListener("click", () => {
  buildDeck();
  showPracticePill(false);
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
});

const shareFinishBtn = document.getElementById("shareFinishBtn");
if (shareFinishBtn) {
  shareFinishBtn.addEventListener("click", (e) => { e.stopPropagation(); shareResults("round"); });
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("overlay")) closeModal();
});

// Speed selector chips (3 options: lento / normal / rápido)
document.querySelectorAll(".speed-chip, .speed-preset").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setSpeed(btn.dataset.speed);
  });
});
// Apply persisted speed to UI right now
syncSpeedUI();

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    document.querySelector(".score-correct .score-lbl").textContent = "Learned";
    document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
    isFlipped = false;
    buildDeck();
    document.getElementById("finishScreen").classList.remove("show");
    document.getElementById("quizScreen").style.display = "none";
    document.getElementById("stage").style.display = "flex";
    renderCard(true);
    hideActions();
  });
});

document.getElementById("shuffleBtn").addEventListener("click", () => {
  document.querySelector(".score-correct .score-lbl").textContent = "Learned";
  document.querySelector(".score-skip    .score-lbl").textContent = "Skipped";
  isFlipped = false;
  buildDeck();
  document.getElementById("finishScreen").classList.remove("show");
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("stage").style.display = "flex";
  renderCard(true);
  hideActions();
});

document.getElementById("themeToggle").addEventListener("click", () => { dark = !dark; applyTheme(); });

/* Quiz swipe listeners */
const qStackEl = document.getElementById("qStackCards");
qStackEl.addEventListener("mousedown", qDragStart);
qStackEl.addEventListener("touchstart", qDragStart, { passive: true });
document.addEventListener("mousemove", qDragMove);
document.addEventListener("touchmove", qDragMove, { passive: true });
document.addEventListener("mouseup", qDragEnd);
document.addEventListener("touchend", qDragEnd);

/* Keyboard shortcuts */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeModal(); return; }
  if (document.getElementById("overlay").classList.contains("open")) return;
  if (document.getElementById("finishScreen").classList.contains("show")) return;
  if (document.getElementById("quizScreen").style.display !== "none") return;
  if ((e.key === " " || e.key === "ArrowUp") && !isFlipped) { e.preventDefault(); toggleFlip(); }
  if (e.key === "ArrowRight" && isFlipped) { document.getElementById("btnCorrect").click(); }
  if (e.key === "ArrowLeft" && isFlipped) { document.getElementById("btnSkip").click(); }
});

/* ── INIT ── */
buildDeck();
renderCard(false);
renderStreakBadge();

/* Wire streak celebration close + tap badge to peek */
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "streakCelebrateClose") closeStreakCelebrate();
});
document.addEventListener("click", (e) => {
  const ov = document.getElementById("streakCelebrate");
  if (ov && ov.classList.contains("show") && e.target && e.target.classList.contains("streak-celebrate-bg")) {
    closeStreakCelebrate();
  }
});
const streakBadgeEl = document.getElementById("streakBadge");
if (streakBadgeEl) {
  streakBadgeEl.addEventListener("click", () => {
    const n = parseInt(localStorage.getItem(STREAK_KEY) || "1", 10);
    celebrateStreak(n, false);
  });
}


/* ════════════════════════════════════════════════════════
   G O A L S   /   O B J E C T I V E S   S Y S T E M
   ════════════════════════════════════════════════════════ */
const GOALS_KEY = "vfc_goals_done";        // JSON array of completed goal ids
const GOALS_STATS = "vfc_goals_stats";       // JSON object with counters

function _gReadStats() {
  try {
    const raw = localStorage.getItem(GOALS_STATS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}
function _gWriteStats(s) {
  try { localStorage.setItem(GOALS_STATS, JSON.stringify(s)); } catch (e) { }
}
function _gReadDone() {
  try {
    const raw = localStorage.getItem(GOALS_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) { return new Set(); }
}
function _gWriteDone(set) {
  try { localStorage.setItem(GOALS_KEY, JSON.stringify([...set])); } catch (e) { }
}

/* Goal definitions. Each goal has:
   id, icon, name, desc, tier, target, getProgress(stats, streak) -> number */
const GOALS = [
  // --- Aprendizaje ---
  {
    id: "first_step", icon: "🌱", name: "Primer paso", desc: "Aprende tu primer verbo.", tier: "Inicio", target: 1,
    getProgress: s => s.learned || 0
  },
  {
    id: "studious_10", icon: "📘", name: "Estudioso", desc: "Domina 10 verbos en total.", tier: "Bronce", target: 10,
    getProgress: s => s.learned || 0
  },
  {
    id: "veteran_50", icon: "🎓", name: "Veterano", desc: "Domina 50 verbos en total.", tier: "Plata", target: 50,
    getProgress: s => s.learned || 0
  },
  {
    id: "master_100", icon: "🏅", name: "Maestro", desc: "Domina 100 verbos en total.", tier: "Oro", target: 100,
    getProgress: s => s.learned || 0
  },

  // --- Quizzes ---
  {
    id: "first_quiz", icon: "📝", name: "Primer quiz", desc: "Termina tu primer quiz.", tier: "Inicio", target: 1,
    getProgress: s => s.quizzes_done || 0
  },
  {
    id: "clean_quiz", icon: "✨", name: "Quiz limpio", desc: "Termina un quiz sin errores.", tier: "Plata", target: 1,
    getProgress: s => s.perfect_quizzes || 0
  },
  {
    id: "perfectionist", icon: "💎", name: "Perfeccionista", desc: "Termina 5 quizzes sin errores.", tier: "Oro", target: 5,
    getProgress: s => s.perfect_quizzes || 0
  },

  // --- Rachas ---
  {
    id: "streak_3", icon: "🔥", name: "Constancia", desc: "Mantén una racha de 3 días.", tier: "Bronce", target: 3,
    getProgress: (s, st) => st || 0
  },
  {
    id: "streak_7", icon: "🚀", name: "Semana fuerte", desc: "Mantén una racha de 7 días.", tier: "Plata", target: 7,
    getProgress: (s, st) => st || 0
  },
  {
    id: "streak_30", icon: "👑", name: "Mes legendario", desc: "Mantén una racha de 30 días.", tier: "Oro", target: 30,
    getProgress: (s, st) => st || 0
  },

  // --- Especiales ---
  {
    id: "no_skip", icon: "🎯", name: "Sin miedo", desc: "Termina una ronda sin hacer skip.", tier: "Plata", target: 1,
    getProgress: s => s.no_skip_rounds || 0
  },
  {
    id: "comeback_5", icon: "💪", name: "Recuperación", desc: "Domina 5 verbos saltados al practicarlos.", tier: "Bronce", target: 5,
    getProgress: s => s.recovered_skips || 0
  },
];

/* Counter mutators (called from gameplay) */
function goalsBumpLearned() {
  const s = _gReadStats();
  s.learned = (s.learned || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsBumpRecoveredSkip() {
  const s = _gReadStats();
  s.recovered_skips = (s.recovered_skips || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsOnRoundFinished({ skipped, correct, total }) {
  const s = _gReadStats();
  s.rounds_done = (s.rounds_done || 0) + 1;
  if ((skipped || 0) === 0 && (correct || 0) > 0) {
    s.no_skip_rounds = (s.no_skip_rounds || 0) + 1;
  }
  _gWriteStats(s);
  checkGoals({ silent: false });
}
function goalsOnQuizFinished({ correct, wrong, total }) {
  const s = _gReadStats();
  s.quizzes_done = (s.quizzes_done || 0) + 1;
  if ((wrong || 0) === 0 && (correct || 0) > 0) {
    s.perfect_quizzes = (s.perfect_quizzes || 0) + 1;
  }
  _gWriteStats(s);
  checkGoals({ silent: false });
}

/* Get current streak (read-only, no side-effects) */
function _currentStreakReadOnly() {
  try { return parseInt(localStorage.getItem(STREAK_KEY) || "0", 10); }
  catch (e) { return 0; }
}

/* Evaluate all goals; trigger toasts for newly-completed ones (unless silent) */
function checkGoals(opts) {
  opts = opts || {};
  const stats = _gReadStats();
  const streak = _currentStreakReadOnly();
  const done = _gReadDone();
  let newlyDone = [];

  GOALS.forEach(g => {
    if (done.has(g.id)) return;
    const cur = g.getProgress(stats, streak) || 0;
    if (cur >= g.target) {
      done.add(g.id);
      newlyDone.push(g);
    }
  });

  if (newlyDone.length > 0) _gWriteDone(done);

  // Update header dot indicator if any goals are pending review (newly done not yet seen)
  _refreshGoalsDot(newlyDone.length);

  // Show a toast for each newly completed (queued)
  if (!opts.silent && newlyDone.length > 0) {
    newlyDone.forEach((g, i) => setTimeout(() => showGoalToast(g), i * 1800));
  }

  // If goals modal is open, refresh its rendering
  if (document.getElementById("goalsOverlay")?.classList.contains("open")) {
    renderGoalsList();
  }
}

function _refreshGoalsDot(forceShow) {
  // Dot shows when there are unseen completed goals OR when checkGoals just unlocked one
  const dot = document.getElementById("goalsBtnDot");
  if (!dot) return;
  const stats = _gReadStats();
  const seen = stats._goals_seen_count || 0;
  const done = _gReadDone().size;
  if (forceShow || done > seen) {
    dot.hidden = false;
  }
}

function showGoalToast(goal) {
  const toast = document.getElementById("goalToast");
  if (!toast) return;
  const emoji = document.getElementById("goalToastEmoji");
  const title = document.getElementById("goalToastTitle");
  const name = document.getElementById("goalToastName");
  if (emoji) emoji.textContent = goal.icon;
  if (title) title.textContent = "¡Objetivo desbloqueado!";
  if (name) name.textContent = goal.name;
  toast.classList.add("show");
  // restart bounce
  if (emoji) {
    emoji.style.animation = "none";
    // reflow trick
    void emoji.offsetWidth;
    emoji.style.animation = "";
  }
  clearTimeout(showGoalToast._tid);
  showGoalToast._tid = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* Render full list inside the modal */
function renderGoalsList() {
  const list = document.getElementById("goalsList");
  if (!list) return;
  const stats = _gReadStats();
  const streak = _currentStreakReadOnly();
  const done = _gReadDone();

  const completed = GOALS.filter(g => done.has(g.id)).length;
  const sumEl = document.getElementById("goalsSummary");
  if (sumEl) sumEl.textContent = `${completed} / ${GOALS.length} completados`;

  list.innerHTML = GOALS.map(g => {
    const cur = Math.min(g.target, g.getProgress(stats, streak) || 0);
    const pct = Math.round((cur / Math.max(1, g.target)) * 100);
    const isDone = done.has(g.id) || cur >= g.target;
    return `
      <div class="goal-item ${isDone ? "completed" : ""}" data-goal-id="${g.id}">
        <div class="goal-icon">${g.icon}</div>
        <div class="goal-body">
          <div class="goal-name">
            <span>${g.name}</span>
            <span class="goal-tier">${g.tier}</span>
          </div>
          <div class="goal-desc">${g.desc}</div>
          <div class="goal-progress">
            <div class="goal-bar"><div class="goal-bar-fill" style="width:${isDone ? 100 : pct}%"></div></div>
            <span class="goal-count">${cur} / ${g.target}</span>
          </div>
        </div>
        <div class="goal-check" aria-hidden="true">${isDone ? "✓" : ""}</div>
      </div>
    `;
  }).join("");
}

function openGoalsModal() {
  const ov = document.getElementById("goalsOverlay");
  if (!ov) return;
  renderGoalsList();
  ov.classList.add("open");
  document.body.style.overflow = "hidden";
  // Mark current done count as seen (clears the red dot)
  const stats = _gReadStats();
  stats._goals_seen_count = _gReadDone().size;
  _gWriteStats(stats);
  const dot = document.getElementById("goalsBtnDot");
  if (dot) dot.hidden = true;
}
function closeGoalsModal() {
  const ov = document.getElementById("goalsOverlay");
  if (!ov) return;
  ov.classList.remove("open");
  document.body.style.overflow = "";
}

/* Wire goals UI */
(function wireGoals() {
  const btn = document.getElementById("goalsBtn");
  if (btn) btn.addEventListener("click", (e) => { e.stopPropagation(); openGoalsModal(); });
  const closeBtn = document.getElementById("goalsClose");
  if (closeBtn) closeBtn.addEventListener("click", closeGoalsModal);
  document.addEventListener("click", (e) => {
    const ov = document.getElementById("goalsOverlay");
    if (!ov || !ov.classList.contains("open")) return;
    if (e.target && e.target.classList.contains("goals-bg")) closeGoalsModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const ov = document.getElementById("goalsOverlay");
      if (ov && ov.classList.contains("open")) closeGoalsModal();
    }
  });
  // Initial dot evaluation (silent so no toast)
  try { checkGoals({ silent: true }); } catch (e) { }
})();


/* ════════════════════════════════════════════════════════════════
   NUEVOS OBJETIVOS — se inyectan en GOALS al cargar
   ════════════════════════════════════════════════════════════════ */
const EXTRA_GOALS = [
  { id: "studious_5", icon: "📗", name: "Aprendiz II", desc: "Marca 5 verbos como 'I know it'", tier: "Bronce", target: 5, getProgress: s => s.learned || 0 },
  { id: "studious_25", icon: "📘", name: "Aprendiz III", desc: "Marca 25 verbos como 'I know it'", tier: "Plata", target: 25, getProgress: s => s.learned || 0 },
  { id: "studious_75", icon: "📙", name: "Aprendiz IV", desc: "Marca 75 verbos como 'I know it'", tier: "Oro", target: 75, getProgress: s => s.learned || 0 },
  { id: "explorer_1", icon: "🔍", name: "Explorador I", desc: "Abre detalles de 1 verbo (✦)", tier: "Inicio", target: 1, getProgress: s => s.details || 0 },
  { id: "explorer_10", icon: "🔎", name: "Explorador II", desc: "Explora 10 verbos con ✦", tier: "Bronce", target: 10, getProgress: s => s.details || 0 },
  { id: "explorer_25", icon: "🧭", name: "Explorador III", desc: "Explora 25 verbos con ✦", tier: "Plata", target: 25, getProgress: s => s.details || 0 },
  { id: "humble_1", icon: "🙋", name: "Honesto I", desc: "Usa 'I don't know' por primera vez", tier: "Inicio", target: 1, getProgress: s => s.skipped_total || 0 },
  { id: "humble_10", icon: "🙌", name: "Honesto II", desc: "Usa 'I don't know' 10 veces", tier: "Bronce", target: 10, getProgress: s => s.skipped_total || 0 },
  { id: "rounds_1", icon: "🔄", name: "Primera ronda", desc: "Completa tu primera ronda", tier: "Inicio", target: 1, getProgress: s => s.rounds_done || 0 },
  { id: "rounds_5", icon: "🔁", name: "5 rondas", desc: "Completa 5 rondas", tier: "Bronce", target: 5, getProgress: s => s.rounds_done || 0 },
  { id: "rounds_15", icon: "⚡", name: "15 rondas", desc: "Completa 15 rondas", tier: "Plata", target: 15, getProgress: s => s.rounds_done || 0 },
  { id: "quiz_3", icon: "📝", name: "Quizzer I", desc: "Completa 3 quizzes", tier: "Bronce", target: 3, getProgress: s => s.quizzes_done || 0 },
  { id: "quiz_10", icon: "📋", name: "Quizzer II", desc: "Completa 10 quizzes", tier: "Plata", target: 10, getProgress: s => s.quizzes_done || 0 },
  { id: "perfect_10", icon: "💯", name: "Perfeccionista II", desc: "Obtén 10 resultados perfectos en quiz", tier: "Oro", target: 10, getProgress: s => s.perfect_quizzes || 0 },
  { id: "speed_slow", icon: "🐢", name: "Pace lento", desc: "Usa velocidad Lento al menos una vez", tier: "Inicio", target: 1, getProgress: s => s.usedSlow ? 1 : 0 },
  { id: "speed_fast", icon: "🐇", name: "Pace rápido", desc: "Usa velocidad Rápido al menos una vez", tier: "Inicio", target: 1, getProgress: s => s.usedFast ? 1 : 0 },
  { id: "streak_14", icon: "🔥", name: "2 semanas", desc: "Mantén una racha de 14 días", tier: "Plata", target: 14, getProgress: (s, st) => st || 0 },
  { id: "streak_60", icon: "🌟", name: "2 meses", desc: "Mantén una racha de 60 días", tier: "Oro", target: 60, getProgress: (s, st) => st || 0 },
  { id: "streak_100", icon: "👑", name: "100 días", desc: "Mantén una racha de 100 días", tier: "Legendario", target: 100, getProgress: (s, st) => st || 0 },
];

// Orden secuencial por familia para desbloqueo progresivo
const GOAL_FAMILY_ORDER = {
  studious: ["first_step", "studious_10", "studious_5", "studious_25", "studious_75", "veteran_50", "master_100"],
  explorer: ["explorer_1", "explorer_10", "explorer_25"],
  humble: ["humble_1", "humble_10"],
  rounds: ["rounds_1", "rounds_5", "rounds_15"],
  quizzes: ["first_quiz", "quiz_3", "quiz_10"],
  perfect: ["clean_quiz", "perfectionist", "perfect_10"],
  speed: ["speed_slow", "speed_fast"],
  streak: ["streak_3", "streak_7", "streak_14", "streak_30", "streak_60", "streak_100"],
};

// Inyectar extra goals en GOALS si aún no existen
(function injectExtraGoals() {
  if (typeof GOALS === "undefined") return;
  const existingIds = new Set(GOALS.map(g => g.id));
  EXTRA_GOALS.forEach(g => { if (!existingIds.has(g.id)) GOALS.push(g); });
})();

// Helper: ¿el objetivo anterior de la familia ya está completado?
function isGoalFamilyUnlocked(id) {
  for (const order of Object.values(GOAL_FAMILY_ORDER)) {
    const idx = order.indexOf(id);
    if (idx <= 0) continue;
    const prevId = order[idx - 1];
    const done = new Set(JSON.parse(localStorage.getItem(GOALS_KEY) || "[]"));
    return done.has(prevId);
  }
  return true; // no está en ninguna familia → siempre desbloqueado
}

// Patch renderGoalsList para mostrar estado bloqueado
const _origRenderGoalsList = typeof renderGoalsList === "function" ? renderGoalsList : null;
if (_origRenderGoalsList) {
  window.renderGoalsList = function () {
    _origRenderGoalsList();
    // Marcar los bloqueados
    const list = document.getElementById("goalsList");
    if (!list) return;
    list.querySelectorAll(".goal-item").forEach(el => {
      const id = el.dataset.goalId;
      if (!id) return;
      if (!isGoalFamilyUnlocked(id)) el.classList.add("is-locked");
    });
  };
}

// Tracking detalles ✦ — capture=true para correr antes del handler existente
document.getElementById("btnDetail")?.addEventListener("click", () => {
  const s = _gReadStats();
  s.details = (s.details || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}, true);

// Tracking skip total acumulado
document.getElementById("btnSkip")?.addEventListener("click", () => {
  const s = _gReadStats();
  s.skipped_total = (s.skipped_total || 0) + 1;
  _gWriteStats(s);
  checkGoals({ silent: false });
}, true);

// Tracking velocidades usadas
document.querySelectorAll(".speed-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const v = parseFloat(chip.dataset.speed);
    const s = _gReadStats();
    if (v <= 0.7) s.usedSlow = true;
    if (v >= 1.2) s.usedFast = true;
    _gWriteStats(s);
    checkGoals({ silent: false });
  });
});


/* ════════════════════════════════════════════════════════════════
   ONBOARDING — primera visita
   ════════════════════════════════════════════════════════════════ */
const ONBOARDING_KEY = "vfc_hasSeenOnboarding";

/*
  In app.js, replace the entire initOnboarding IIFE with this version.
  Key additions:
    - Progress bar fill
    - Smoother visual sync
    - Fixed "see intro" button in Settings (was calling classList.add("visible"), now uses opacity)
*/

(function initOnboarding() {
  const _forceOnboarding = new URLSearchParams(location.search).has('preview');
  if (!_forceOnboarding && localStorage.getItem(ONBOARDING_KEY)) return;
  const overlay = document.getElementById("onboardingOverlay");
  if (!overlay) return;

  overlay.style.display = "flex";
  overlay.style.opacity = "0";
  requestAnimationFrame(() => { overlay.style.opacity = "1"; });

  let current = 0;
  const slides = overlay.querySelectorAll(".onboarding-slide");
  const dots = overlay.querySelectorAll(".ob-dot");
  const btnBack = document.getElementById("obBack");
  const btnNext = document.getElementById("obNext");
  const btnStart = document.getElementById("obStart");
  const progFill = document.getElementById("obProgressFill");

  function goTo(n) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    dots[current].setAttribute("aria-selected", "false");
    current = n;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
    dots[current].setAttribute("aria-selected", "true");
    btnBack.style.visibility = current === 0 ? "hidden" : "visible";
    btnNext.style.display = current < slides.length - 1 ? "inline-flex" : "none";
    btnStart.style.display = current === slides.length - 1 ? "inline-flex" : "none";
    // Update progress bar
    if (progFill) {
      const pct = Math.round(((current + 1) / slides.length) * 100);
      progFill.style.width = pct + "%";
    }
  }

  btnNext.addEventListener("click", () => { if (current < slides.length - 1) goTo(current + 1); });
  btnBack.addEventListener("click", () => { if (current > 0) goTo(current - 1); });
  btnStart.addEventListener("click", closeOnboarding);
  dots.forEach(d => d.addEventListener("click", () => goTo(+d.dataset.target)));

  // Set initial progress
  goTo(0);

  function closeOnboarding() {
    localStorage.setItem(ONBOARDING_KEY, "1");
    overlay.style.opacity = "0";
    setTimeout(() => { overlay.style.display = "none"; }, 350);
  }
})();

/* ════════════════════════════════════════════════════════════════
   SETTINGS — configuración persistida en vfc_settings
   ════════════════════════════════════════════════════════════════ */
const SETTINGS_KEY = "vfc_settings";
const DEFAULT_SETTINGS = { theme: "auto", animations: "on", audioSpeed: "1", autoPlay: "off", roundSize: "10", quizConfirm: "on" };

function loadVFCSettings() {
  try { return Object.assign({}, DEFAULT_SETTINGS, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}")); }
  catch { return { ...DEFAULT_SETTINGS }; }
}
function saveVFCSettings(s) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch { } }

function applyVFCSettings(s) {
  // Tema
  if (s.theme === "dark") { dark = true; applyTheme(); }
  else if (s.theme === "light") { dark = false; applyTheme(); }
  // Animaciones
  if (s.animations === "off") document.documentElement.classList.add("no-animations");
  else document.documentElement.classList.remove("no-animations");
  // Audio speed
  const v = parseFloat(s.audioSpeed || "1");
  if (!isNaN(v) && v > 0) {
    currentSpeed = v;
    document.querySelectorAll(".speed-chip").forEach(chip => {
      const active = Math.abs(parseFloat(chip.dataset.speed) - v) < 0.01;
      chip.classList.toggle("active", active);
      chip.setAttribute("aria-checked", String(active));
    });
  }
}

(function initSettings() {
  const overlay = document.getElementById("settingsOverlay");
  const openBtn = document.getElementById("settingsBtn");
  const closeBtn = document.getElementById("settingsClose");
  if (!overlay || !openBtn) return;

  let s = loadVFCSettings();
  applyVFCSettings(s);

  function _syncToggle(id, isOn) {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.dataset.val = isOn ? "on" : "off";
    btn.setAttribute("aria-pressed", String(isOn));
    btn.classList.toggle("is-on", isOn);
  }

  function syncControls() {
    const tEl = document.getElementById("settingTheme");
    const aEl = document.getElementById("settingAudioSpeed");
    const rEl = document.getElementById("settingRoundSize");
    if (tEl) tEl.value = s.theme;
    if (aEl) aEl.value = s.audioSpeed;
    if (rEl) rEl.value = s.roundSize;
    _syncToggle("settingAnimations", s.animations === "on");
    _syncToggle("settingAutoPlay", s.autoPlay === "on");
    _syncToggle("settingQuizConfirm", s.quizConfirm === "on");
  }

  // Selects
  [["settingTheme", "theme"], ["settingAudioSpeed", "audioSpeed"], ["settingRoundSize", "roundSize"]].forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener("change", e => {
      s[key] = e.target.value;
      saveVFCSettings(s);
      applyVFCSettings(s);
    });
  });

  // Toggles
  [["settingAnimations", "animations"], ["settingAutoPlay", "autoPlay"], ["settingQuizConfirm", "quizConfirm"]].forEach(([id, key]) => {
    document.getElementById(id)?.addEventListener("click", () => {
      const isOn = document.getElementById(id).dataset.val !== "on";
      s[key] = isOn ? "on" : "off";
      saveVFCSettings(s);
      _syncToggle(id, isOn);
      applyVFCSettings(s);
    });
  });

  // Volver a ver intro
  document.getElementById("settingResetOnboarding")?.addEventListener("click", () => {
    localStorage.removeItem(ONBOARDING_KEY);
    const overlay = document.getElementById("onboardingOverlay");
    if (!overlay) return;
    // Cerrar settings primero
    closeSettings();
    setTimeout(() => {
      overlay.style.display = "flex";
      requestAnimationFrame(() => overlay.classList.add("visible"));
    }, 320);
  });

  // Reset racha
  document.getElementById("settingResetStreak")?.addEventListener("click", () => {
    if (!confirm("¿Resetear tu racha diaria?")) return;
    try { localStorage.removeItem(STREAK_KEY); localStorage.removeItem(STREAK_DATE_KEY); } catch { }
    _setStreakNumText(0);
    if (typeof showShareToast === "function") showShareToast("Racha reseteada 🔄");
  });

  // Borrar todo
  document.getElementById("settingResetAll")?.addEventListener("click", () => {
    if (!confirm("¿Borrar TODO el progreso? Esta acción no se puede deshacer.")) return;
    [STREAK_KEY, STREAK_DATE_KEY, GOALS_KEY, GOALS_STATS, SETTINGS_KEY, ONBOARDING_KEY, "vfc_speed"].forEach(k => {
      try { localStorage.removeItem(k); } catch { }
    });
    if (typeof showShareToast === "function") showShareToast("Progreso borrado 🗑️");
    setTimeout(() => location.reload(), 900);
  });

  // Abrir
  openBtn.addEventListener("click", () => {
    s = loadVFCSettings();
    syncControls();
    overlay.style.display = "flex";
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  });

  // Cerrar
  function closeSettings() {
    overlay.classList.remove("is-open");
    setTimeout(() => { overlay.style.display = "none"; }, 290);
  }
  closeBtn.addEventListener("click", closeSettings);
  overlay.addEventListener("click", e => { if (e.target === overlay) closeSettings(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.style.display !== "none") closeSettings();
  });
})();


/* ════════════════════════════════════════════════════════════════
   PWA — beforeinstallprompt + service worker
   ════════════════════════════════════════════════════════════════ */
(function initPWA() {
  let deferredPrompt = null;
  const pwaSection = document.getElementById("pwaSection");
  const pwaBtn = document.getElementById("pwaInstallBtn");

  /* Capture the install prompt so we can trigger it later */
  window.addEventListener("beforeinstallprompt", e => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaSection) pwaSection.style.display = "";  // show Settings install row
  });

  /* Shared install trigger */
  async function triggerInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (outcome === "accepted") {
      if (pwaSection) pwaSection.style.display = "none";
      if (typeof showShareToast === "function") showShareToast("¡App instalada! 📲");
    }
  }

  /* Settings row button */
  if (pwaBtn) pwaBtn.addEventListener("click", triggerInstall);

  /* Already installed */
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if (pwaSection) pwaSection.style.display = "none";
  });

  /* Register service worker */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js")
      .then(reg => console.log("[PWA] SW registered", reg.scope))
      .catch(err => console.warn("[PWA] SW registration failed", err));
  }
})();


/* ════════════════════════════════════════════════════════════════
   RETENCIÓN — mensaje en finish screen
   ════════════════════════════════════════════════════════════════ */
function showRetentionMessage() {
  const retEl = document.getElementById("retentionMsg");
  if (!retEl) return;
  const streak = parseInt(localStorage.getItem(STREAK_KEY) || "0", 10);
  const nextMs = STREAK_MILESTONES.find(m => m > streak) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];
  retEl.innerHTML = `
    <div class="retention-wrap">
      <p class="retention-main">📅 Volvé mañana por 10 nuevos verbos</p>
      <div class="retention-streak">
        <span class="retention-flame">🔥</span>
        <span class="retention-streak-val">${streak} día${streak !== 1 ? "s" : ""} de racha</span>
        <span class="retention-next">→ siguiente hito: ${nextMs} días</span>
      </div>
    </div>`;
  retEl.style.display = "";
}

// Hook: observar cuando finishScreen se muestra
(function hookFinishRetention() {
  const fsEl = document.getElementById("finishScreen");
  if (!fsEl) return;
  const obs = new MutationObserver(() => {
    if (fsEl.classList.contains("show")) showRetentionMessage();
  });
  obs.observe(fsEl, { attributes: true, attributeFilter: ["class"] });
})();
