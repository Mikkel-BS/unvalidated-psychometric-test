window.TEST_MODEL = {
  title: "Unvalidated Personality Test",
  version: "0.3.1",
  responseScale: [
    { value: 1, label: "Strongly disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neither agree nor disagree" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly agree" }
  ],
  traits: {
    socialEnergy: {"name":"Social Energy","group":"People","low":"Solitude-seeking","high":"Interaction-seeking","description":"Your reported preference for company and your energy or need for solitude after social activity."},
    socialBoldness: {"name":"Social Boldness","group":"People","low":"Initially reserved","high":"Ready to speak up","description":"How readily you initiate contact and speak up in unfamiliar groups. This is separate from how much company you want."},
    influence: {"name":"Influence","group":"People","low":"Less inclined to steer","high":"Inclined to steer","description":"How much you want to shape shared decisions and advocate for an outcome. This describes inclination, not persuasive skill."},
    cooperativeness: {"name":"Willingness to Compromise","group":"People","low":"Holds own position","high":"Seeks accommodation","description":"How readily you adjust your preferences to reach agreement. This scale does not assess kindness, fairness, or moral character."},
    empathicAttention: {"name":"Emotional Attention","group":"People","low":"Less attention to emotional cues","high":"Attends to emotional cues","description":"How much attention you report giving to emotional cues and feelings in conversation. This does not measure accuracy, empathy skill, or caring."},
    structure: {"name":"Structure","group":"Execution","low":"Improvisational","high":"Systematic","description":"How strongly you prefer plans, order, routines, and clearly arranged work."},
    persistence: {"name":"Persistence","group":"Execution","low":"Quick to disengage","high":"Tenacious","description":"How readily you keep effort going after novelty fades or obstacles appear."},
    adaptability: {"name":"Adaptability","group":"Execution","low":"Takes time to adjust","high":"Adjusts readily","description":"How readily you report getting going with revised plans or methods after everyday changes. You can feel annoyed by a change and still adjust readily."},
    analyticalCuriosity: {"name":"Analytical Curiosity","group":"Thinking","low":"Less drawn to analysis","high":"Enjoys analysis","description":"How much you enjoy examining assumptions, mechanisms, and evidence. This is a reported interest, not a test of reasoning ability."},
    imagination: {"name":"Imagination","group":"Thinking","low":"Concrete focus","high":"Explores possibilities","description":"How much you enjoy speculative ideas and unusual possibilities. This does not assess creativity or mental imagery ability."},
    decisiveness: {"name":"Decision Pace","group":"Temperament","low":"Takes time to choose","high":"Commits readily","description":"How quickly you tend to commit in routine, everyday choices. This does not assess decision quality, high-stakes judgment, or doubt after choosing."},
    emotionalSteadiness: {"name":"Emotional Steadiness","group":"Temperament","low":"More affected by setbacks","high":"Recovers readily","description":"How composed you tend to feel and how readily you recover after everyday pressure. This is not a measure of mental health."}
  },
  interpretations: {
    socialEnergy: {"low":"You may prefer more time alone and want quiet time after social activity.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may actively seek company and feel energised by lively interaction.","lowTradeoff":"When would you welcome company, and when would you prefer solitude?","highTradeoff":"When does company feel energising, and when would you welcome quiet?","prompt":"After a busy social day, what kind of evening sounds restorative?"},
    socialBoldness: {"low":"You may observe a new group before speaking or drawing attention to yourself.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may find it fairly easy to initiate contact and speak early in unfamiliar groups.","lowTradeoff":"What makes it easier to contribute in an unfamiliar group?","highTradeoff":"How do you decide when to speak and when to listen in a new group?","prompt":"What helps you offer an opinion in a group you have just met?"},
    influence: {"low":"You may prefer to contribute without steering where the group lands.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may enjoy persuading others and giving discussions direction.","lowTradeoff":"When would you want your preference to shape a shared decision?","highTradeoff":"How do you make room for other preferences while advocating for yours?","prompt":"When do you push for your preferred outcome, and when do you let it go?"},
    cooperativeness: {"low":"You report being reluctant to adjust your preferences when coordinating shared plans.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may readily accommodate preferences and look for common ground.","lowTradeoff":"Which everyday preferences would you be willing to adjust?","highTradeoff":"When would you want to state a preference rather than accommodate?","prompt":"What kind of disagreement is worth holding your ground on?"},
    empathicAttention: {"low":"You report giving less attention to emotional cues and feelings during conversations.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You report attending to emotional cues and considering feelings during conversations. That does not establish whether your interpretations are correct.","lowTradeoff":"When would you want to check how someone is feeling?","highTradeoff":"How do you check whether your interpretation of a cue fits what someone feels?","prompt":"Which cues do you attend to, and how could you check your interpretation?"},
    structure: {"low":"You may prefer to improvise and keep options open instead of arranging work in advance.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may feel at ease with plans, systems, and clearly sequenced work.","lowTradeoff":"When would a simple plan help you begin?","highTradeoff":"When does planning help, and when is it time to start?","prompt":"Which tasks benefit from a system, and which get easier when you just begin?"},
    persistence: {"low":"You may find it harder to maintain effort through repetition or repeated setbacks, even when a goal matters to you.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may keep working through repetition, slow progress, and obstacles.","lowTradeoff":"What helps you continue with a goal you still value?","highTradeoff":"What would make you reconsider a goal despite the effort already invested?","prompt":"How do you decide whether to persevere or pivot?"},
    adaptability: {"low":"You report taking time to get going again when plans or methods change.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You report getting going readily with revised plans and methods after everyday changes.","lowTradeoff":"What helps you get going after a plan changes?","highTradeoff":"What helps you preserve useful parts of an approach when changing it?","prompt":"What sort of change energises you, and what sort costs you momentum?"},
    analyticalCuriosity: {"low":"You may have less interest in examining assumptions and mechanisms once you have a usable explanation.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may enjoy probing evidence, mechanisms, and competing explanations.","lowTradeoff":"Which claims would you want to examine more closely?","highTradeoff":"How do you decide when you have examined an explanation enough?","prompt":"Which questions make you want to inspect the reasoning underneath?"},
    imagination: {"low":"You report less interest in imaginary scenarios and unusual possibilities.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may often explore unusual or speculative possibilities for their own sake.","lowTradeoff":"When might exploring an unusual possibility interest you?","highTradeoff":"How do you choose a possibility to develop or test?","prompt":"Where does speculation help you, and where does it become a detour?"},
    decisiveness: {"low":"You report taking time to gather information and compare alternatives before routine choices.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You report committing readily when making routine, everyday choices.","lowTradeoff":"When does more comparison help an everyday choice, and when does it add little?","highTradeoff":"When would you want to slow down before committing?","prompt":"How does your pace change between an everyday choice and an important decision?"},
    emotionalSteadiness: {"low":"You may feel setbacks or tense interactions strongly and need time to recover.","middle":"Your answers average near the midpoint on this scale. The score alone does not explain why.","high":"You may generally keep your balance and recover after pressure or criticism.","lowTradeoff":"What helps you recover after a setback?","highTradeoff":"How do you recognise feelings that deserve attention even when you feel composed?","prompt":"What helps you regain your footing after a difficult interaction?"}
  },
  deeperReadings: {
    socialEnergy: {
      low: "This end of the scale combines a preference for solo time with wanting quiet after company. It says little about how much you like particular people, or how confidently you speak when you are with them. A lively evening and a restorative evening need not look the same.",
      middle: "The average can hide different pulls: enjoying company, needing time alone afterward, or simply choosing the middle response. Your six answers show which statements contributed; the number alone cannot distinguish them.",
      high: "This end combines seeking company with feeling energised by lively interaction. Those experiences need not match in every setting: a small conversation and a crowded party can land differently. The score describes your answers about social appetite, not your social skill."
    },
    socialBoldness: {
      low: "The questions focus on making the first move and speaking early when the group is unfamiliar. Hanging back can mean discomfort, or a deliberate choice to observe before entering. This scale records that pattern of answers without deciding which motive applies.",
      middle: "An average here could reflect moderate answers throughout or different reactions to introducing yourself, offering an opinion, and drawing attention. The six statements make those distinctions more visible than the score.",
      high: "The common thread is readiness to enter a new social setting out loud: introducing yourself, asking, or contributing early. That is separate from wanting a large social calendar or trying to control the group's decision. Ease speaking up also says little about how well a contribution lands."
    },
    influence: {
      low: "This scale asks whether you want to shape a shared outcome after making your view known. A lower score can sit alongside strong opinions or social confidence; it only suggests less inclination to keep steering. The questionnaire cannot tell whether you step back out of trust, disinterest, or something else.",
      middle: "The average could come from mixed answers about advocating, guiding discussion, and leaving decisions to others. Check the six statements before turning this into a story about when you take charge.",
      high: "The theme is wanting a say in where a group lands, from advocating an option to helping choose the destination. It does not measure whether others agree or whether your preferred outcome is best. The interesting conversation is how you handle a group that wants a different direction."
    },
    cooperativeness: {
      low: "The questions concern ordinary preference conflicts in shared plans. Holding your preferred option is different from being unkind, and the score does not judge whether a particular compromise would be fair. Think about the kinds of preferences you would readily trade and the ones you would not.",
      middle: "A midpoint could conceal opposite answers to yielding your preference, seeking middle ground, and adapting how you work with someone. Inspect those items before calling the pattern flexible or consistent.",
      high: "This end is about making room for another person's preferences in a shared plan. That can keep coordination moving, but the items do not reveal whether the agreement was fair to you or whether a deeper disagreement remained. The score describes willingness, not an obligation to yield."
    },
    empathicAttention: {
      low: "These statements ask how much attention you give to tone, expression, reactions, and possible feelings while talking. A lower score does not establish that you miss cues or care less; those are different questions. Explicit words may still be the clearest way to understand someone.",
      middle: "The items cover several ways of attending to emotion, from tone and expression to thinking about feelings. A middle average cannot reveal which of those received your attention. Open the answers to see the pattern.",
      high: "You report paying attention to more than the literal words in a conversation. That can give you more to ask about, but a cue is not a verified account of another person's feelings. The useful next move may be checking your impression with them."
    },
    structure: {
      low: "This end favours starting without much advance arrangement and relying less on plans or tracking systems. That describes a working preference, not whether deadlines are met. A task with many dependencies may call for a different amount of structure than a small familiar one.",
      middle: "Planning a sequence, tracking commitments, and starting complex work without an outline are related but distinct. Their answers can offset one another. Look at the six items to see what the average compresses.",
      high: "The scale brings together planning, settling details, and keeping a system for commitments. A high score says those approaches appeal to you; it does not prove that every plan gets executed. The interesting boundary is where organising makes starting easier, or begins to replace starting."
    },
    persistence: {
      low: "The questions cover effort when a task becomes repetitive, progress is slow, or an attempt fails. A lower score does not tell us whether you were wisely changing goals or struggling to continue one you still wanted. Those two stories deserve different conversations.",
      middle: "The score averages responses about boredom, setbacks, repeated practice, and long projects. Those demands can pull in different directions; a midpoint is not evidence of an ideal balance between perseverance and pivoting.",
      high: "This end describes staying with work after the novelty fades and through slow progress. It says nothing about whether a goal still deserves the effort. A determined person can also decide to stop when the evidence or priorities change."
    },
    adaptability: {
      low: "The items ask how quickly you settle into a changed plan or method and regain momentum. Feeling annoyed about the disruption is a separate matter. You may still adjust successfully after taking time to reset; the score does not assess the outcome.",
      middle: "Changes to plans, routines, and methods can elicit different answers. The average cannot identify which kind of change costs you momentum. The six responses are more informative than a general label.",
      high: "The common thread is getting going with a revised plan or method when circumstances change. That does not mean liking the disruption, changing direction constantly, or abandoning useful habits. It describes the reported adjustment, not whether the new plan was good."
    },
    analyticalCuriosity: {
      low: "These items ask whether you want to inspect assumptions, mechanisms, and evidence once an explanation seems usable. Less interest in doing that for its own sake is not a reasoning deficit. Time pressure and the stakes of a claim can make a closer look more or less worthwhile.",
      middle: "The questions range from examining evidence to investigating how systems work. An average can mix strong interest in one form of inquiry with less interest in another. It cannot tell us when your curiosity switches on.",
      high: "The scale is about enjoying the work of looking under an explanation: what it assumes, what evidence fits, and what else could account for it. It is an interest, not a test of being right. A satisfying discussion might be about which questions deserve a deeper dive."
    },
    imagination: {
      low: "The items ask about pleasure in hypothetical scenarios, unusual combinations, and speculative ideas. A lower score points toward a more concrete focus in these questions; it does not measure whether you create good solutions or can picture things vividly.",
      middle: "The statements mix spontaneous alternatives, hypothetical talk, and enjoyment of combining ideas. Their answers may differ even when the average sits near the centre. The number cannot resolve those distinct interests.",
      high: "This end reflects enjoyment of possibilities before their practical value is clear. An unusual connection can be fun to explore without having to become a plan. The scale does not assess whether the idea is original or useful once tested."
    },
    decisiveness: {
      low: "This scale is deliberately limited to routine choices. A slower pace can involve comparing workable alternatives or looking for one more piece of information; the items do not reveal why you wait. It should not be carried over to important decisions without asking about those separately.",
      middle: "The items all concern everyday commitment pace, but an average still cannot tell whether each choice felt easy or whether some answers pulled against others. Inspect the six responses before naming a personal rule.",
      high: "The questions point to moving from options to commitment fairly quickly in everyday matters. That is a pace, not a verdict on judgment or the quality of the choice. There may be occasions when further comparison is valuable even if you usually move on readily."
    },
    emotionalSteadiness: {
      low: "The items bring together frustration, reactions to criticism, rumination, and recovery after pressure. Feeling one of those strongly does not imply all of them follow the same pattern. A difficult situation can also matter for good reasons; this is not a mental-health assessment.",
      middle: "The score averages several kinds of reaction, including recovery after setbacks and thoughts that linger after tension. A midpoint can hide meaningful differences between them. The six answers are the place to start.",
      high: "This end reflects reported composure and recovery across everyday setbacks. It does not require an absence of feeling, or show how you would react to a major event. A person can appear steady while still needing time and support afterward."
    }
  },
  items: [
    {"id":1,"trait":"socialEnergy","reverse":false,"text":"After a long stretch with people, I often still have energy for more conversation."},
    {"id":2,"trait":"structure","reverse":false,"text":"I feel better about a task once I have given it a clear sequence or plan."},
    {"id":3,"trait":"analyticalCuriosity","reverse":false,"text":"When I hear an explanation, I enjoy examining the evidence behind it."},
    {"id":4,"trait":"cooperativeness","reverse":true,"text":"In shared plans, I find it difficult to give up my preferred option."},
    {"id":5,"trait":"emotionalSteadiness","reverse":false,"text":"Under pressure, I can usually keep one setback from colouring the rest of my day."},
    {"id":6,"trait":"imagination","reverse":false,"text":"I enjoy exploring ideas that are interesting even when they have no immediate practical use."},
    {"id":7,"trait":"socialBoldness","reverse":false,"text":"I am comfortable being the first person to introduce myself in an unfamiliar group."},
    {"id":8,"trait":"persistence","reverse":false,"text":"I can keep working steadily on something long after the interesting part is over."},
    {"id":9,"trait":"influence","reverse":false,"text":"I enjoy trying to persuade a group to choose the option I favour."},
    {"id":10,"trait":"adaptability","reverse":false,"text":"When a plan changes at short notice, I can usually get started on the revised plan readily."},
    {"id":11,"trait":"empathicAttention","reverse":false,"text":"During conversations, I pay attention to changes in people's tone of voice."},
    {"id":12,"trait":"decisiveness","reverse":true,"text":"For routine choices, I tend to spend time gathering information before committing."},
    {"id":13,"trait":"socialEnergy","reverse":true,"text":"Even enjoyable social events tend to leave me wanting a substantial amount of time alone."},
    {"id":14,"trait":"structure","reverse":true,"text":"Detailed plans often feel like unnecessary constraints on how I work."},
    {"id":15,"trait":"analyticalCuriosity","reverse":true,"text":"If an explanation sounds plausible, I rarely feel a need to inspect how it works underneath."},
    {"id":16,"trait":"cooperativeness","reverse":false,"text":"I will often accept an option I like less if it helps a group agree on shared plans."},
    {"id":17,"trait":"emotionalSteadiness","reverse":true,"text":"Small frustrations can stay with me for longer than I would like."},
    {"id":18,"trait":"imagination","reverse":true,"text":"I have little interest in exploring imaginary scenarios."},
    {"id":19,"trait":"socialBoldness","reverse":true,"text":"When I enter a room where I know almost nobody, I prefer to let others make the first move."},
    {"id":20,"trait":"persistence","reverse":true,"text":"Once a task becomes repetitive, my effort tends to drop quickly."},
    {"id":21,"trait":"influence","reverse":true,"text":"I usually avoid trying to change people's minds, even when I disagree strongly."},
    {"id":22,"trait":"adaptability","reverse":true,"text":"When plans change unexpectedly, it takes me time to settle into a new approach."},
    {"id":23,"trait":"empathicAttention","reverse":true,"text":"During conversations, I give little attention to people's facial expressions."},
    {"id":24,"trait":"decisiveness","reverse":false,"text":"When several options would work for an everyday decision, I usually choose one promptly."},
    {"id":25,"trait":"socialEnergy","reverse":false,"text":"I naturally look for chances to turn solitary activities into shared ones."},
    {"id":26,"trait":"structure","reverse":false,"text":"I like having a reliable system for keeping track of small commitments."},
    {"id":27,"trait":"analyticalCuriosity","reverse":false,"text":"I enjoy finding the hidden assumption that makes an argument succeed or fail."},
    {"id":28,"trait":"cooperativeness","reverse":false,"text":"When tension rises in a group, I usually start looking for a workable middle ground."},
    {"id":29,"trait":"emotionalSteadiness","reverse":false,"text":"After blunt criticism, I can usually regain my composure quickly."},
    {"id":30,"trait":"imagination","reverse":false,"text":"My mind often produces alternative explanations or possibilities without being asked to."},
    {"id":31,"trait":"socialBoldness","reverse":false,"text":"I am comfortable contributing early in a group where I know few people."},
    {"id":32,"trait":"persistence","reverse":false,"text":"If I decide something matters, slow progress rarely makes me abandon it."},
    {"id":33,"trait":"influence","reverse":false,"text":"In group decisions, I like to advocate for my preferred option."},
    {"id":34,"trait":"adaptability","reverse":false,"text":"When circumstances change, I usually settle into a revised plan quickly."},
    {"id":35,"trait":"empathicAttention","reverse":false,"text":"I pay attention to people's reactions while I am speaking."},
    {"id":36,"trait":"decisiveness","reverse":false,"text":"For routine choices, I usually commit before I have explored every option."},
    {"id":37,"trait":"socialEnergy","reverse":true,"text":"When I have free time, my default preference is usually to spend it by myself."},
    {"id":38,"trait":"structure","reverse":true,"text":"I often rely on memory rather than lists, reminders, or organised systems."},
    {"id":39,"trait":"analyticalCuriosity","reverse":true,"text":"Once I understand the main point of an explanation, I have little interest in examining its assumptions."},
    {"id":40,"trait":"cooperativeness","reverse":true,"text":"When a shared plan involves different preferences, I am reluctant to meet the other person halfway."},
    {"id":41,"trait":"emotionalSteadiness","reverse":true,"text":"When several things go wrong at once, my reactions can become noticeably sharper."},
    {"id":42,"trait":"imagination","reverse":true,"text":"I prefer discussions to stay close to concrete facts and immediate realities."},
    {"id":43,"trait":"socialBoldness","reverse":true,"text":"I hold back an opinion in a new group until I know how it will be received."},
    {"id":44,"trait":"persistence","reverse":true,"text":"I tend to stop trying after several unsuccessful attempts, even when the goal matters to me."},
    {"id":45,"trait":"influence","reverse":true,"text":"I am happiest contributing ideas without needing to steer the final decision."},
    {"id":46,"trait":"adaptability","reverse":true,"text":"Once I have settled into an approach, changing methods costs me a lot of momentum."},
    {"id":47,"trait":"empathicAttention","reverse":true,"text":"I seldom focus on changes in someone's tone during a conversation."},
    {"id":48,"trait":"decisiveness","reverse":true,"text":"For routine choices, I often leave the decision open while I compare alternatives."},
    {"id":49,"trait":"socialEnergy","reverse":false,"text":"A lively group usually increases my energy rather than draining it."},
    {"id":50,"trait":"structure","reverse":false,"text":"I prefer to settle the practical details of a task before I begin."},
    {"id":51,"trait":"analyticalCuriosity","reverse":false,"text":"I like comparing competing explanations to see which one accounts for more of the evidence."},
    {"id":52,"trait":"cooperativeness","reverse":false,"text":"On a shared task, I am willing to adjust my preferred way of working to suit someone else."},
    {"id":53,"trait":"emotionalSteadiness","reverse":false,"text":"Unexpected problems rarely make me feel that everything is suddenly going badly."},
    {"id":54,"trait":"imagination","reverse":false,"text":"I enjoy combining ideas from unrelated areas to see what new angle appears."},
    {"id":55,"trait":"socialBoldness","reverse":false,"text":"I am comfortable speaking up in a group I have only just joined."},
    {"id":56,"trait":"persistence","reverse":false,"text":"I am willing to repeat an unglamorous process many times if that is what improvement requires."},
    {"id":57,"trait":"influence","reverse":false,"text":"I like to help determine which outcome a group works toward."},
    {"id":58,"trait":"adaptability","reverse":false,"text":"I am comfortable learning a different way to do a familiar task when circumstances require it."},
    {"id":59,"trait":"empathicAttention","reverse":false,"text":"I make a point of considering how the other person might be feeling during a conversation."},
    {"id":60,"trait":"decisiveness","reverse":false,"text":"For everyday decisions, I tend to move from considering options to choosing fairly quickly."},
    {"id":61,"trait":"socialEnergy","reverse":true,"text":"When I want to recharge, I usually choose a quiet activity on my own."},
    {"id":62,"trait":"structure","reverse":true,"text":"I am comfortable starting complex work without deciding in advance how I will organise it."},
    {"id":63,"trait":"analyticalCuriosity","reverse":true,"text":"I seldom investigate how a system works unless a problem forces me to."},
    {"id":64,"trait":"cooperativeness","reverse":true,"text":"In a disagreement over preferences, I tend to expect the other person to make the adjustment."},
    {"id":65,"trait":"emotionalSteadiness","reverse":true,"text":"A tense interaction can occupy my thoughts for quite a while afterwards."},
    {"id":66,"trait":"imagination","reverse":true,"text":"Exploring unusual combinations of ideas holds little appeal for me."},
    {"id":67,"trait":"socialBoldness","reverse":true,"text":"I prefer to watch how a new group works before drawing attention to myself."},
    {"id":68,"trait":"persistence","reverse":true,"text":"When a goal requires months of small steps, I find it hard to maintain the same commitment."},
    {"id":69,"trait":"influence","reverse":true,"text":"Once I have shared my view, I usually leave it to others to steer the final decision."},
    {"id":70,"trait":"adaptability","reverse":true,"text":"After an unexpected change to a routine, it takes me time to get going again."},
    {"id":71,"trait":"empathicAttention","reverse":true,"text":"I give little thought to how the other person might be feeling while we talk."},
    {"id":72,"trait":"decisiveness","reverse":true,"text":"Even for everyday choices, I tend to spend a while weighing alternatives before deciding."}
  ]
};
