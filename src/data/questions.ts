export interface Question {
  id: string;
  year: string;
  section: string;
  number: string;
  type: 'mcq' | 'short-answer';
  text: string;
  marks: number;
  unitAos: string; // e.g., "U3A1", "U4A3"
  options?: {
    label: string;
    text: string;
  }[];
  correctAnswer: string;
  imageUrl?: string;
  report: {
    stats?: Record<string, number>;
    comment: string;
    averageMarks?: number;
    maxMarks?: number;
  };
}

export const EXAM_QUESTIONS: Question[] = [
  {
    id: '2023-A-1',
    year: '2023',
    section: 'A',
    number: '1',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 1\nWhich of the following branches of the nervous system are dominant in a conscious response, an unconscious response and a spinal reflex?",
    options: [
      { label: 'A', text: 'Conscious response: spinal cord; Unconscious response: brain; Spinal reflex: brain and spinal cord' },
      { label: 'B', text: 'Conscious response: brain and spinal cord; Unconscious response: spinal cord; Spinal reflex: spinal cord' },
      { label: 'C', text: 'Conscious response: brain; Unconscious response: spinal cord and brain; Spinal reflex: spinal cord' },
      { label: 'D', text: 'Conscious response: brain and spinal cord; Unconscious response: brain and spinal cord; Spinal reflex: brain' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 8, 'B': 12, 'C': 72, 'D': 8 },
      comment: "Conscious responses involve the brain. Unconscious responses can involve both the spinal cord and the brain. The spinal reflex is initiated in the spinal cord without immediate brain involvement."
    }
  },
  {
    id: '2023-B-1-a',
    year: '2023',
    section: 'B',
    number: '1a',
    type: 'short-answer',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 1\nLana is feeling stressed about her upcoming drama performance and nervous about forgetting lines on stage in front of an audience, despite practising at home in front of her family. Lana decides to go out with friends the night before the first performance to take her mind off the performance. She stays up late and does not get adequate sleep.\n\na. Identify one physiological response that Lana may experience when she steps out on stage for the first time.",
    correctAnswer: "Increased heart rate, rapid breathing, or sweating (activation of the sympathetic nervous system).",
    report: {
      maxMarks: 1,
      comment: "Students needed to identify a specific physiological change associated with the fight-flight-freeze response or sympathetic nervous system activation."
    }
  },
  {
    id: '2024-B-1-a',
    year: '2024',
    section: 'B',
    number: '1a',
    type: 'short-answer',
    marks: 3,
    unitAos: 'U3A2',
    text: "Question 1\nThe picture below demonstrates the learning of a new motor skill.\n\na. Learning the motor skill of teeth brushing involves interactions between the basal ganglia and neocortex. Discuss how the basal ganglia and neocortex are involved in this example. In your answer, refer to the\n• role of each brain region\n• interaction between the two brain regions.",
    correctAnswer: "The neocortex is responsible for the conscious planning and execution of the motor movements. The basal ganglia are involved in the automation of the motor skill and the coordination of smooth movements. They interact as the neocortex sends motor commands and the basal ganglia refine these commands and help store the procedural memory.",
    imageUrl: 'https://picsum.photos/seed/vcaa-2024-q1/800/600',
    report: {
      maxMarks: 3,
      comment: "A high-scoring response identified the neocortex's role in complex motor planning and the basal ganglia's role in procedural learning and automation. The interaction involves the loop between these regions for refining motor output."
    }
  },
  {
    id: '2025-A-20',
    year: '2025',
    section: 'A',
    number: '20',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 20\nIn one of the studies analysed by the researchers, a questionnaire asked participants to rate their chance of falling asleep on a five-point scale.\nWhich of the following lists a strength of the questionnaire’s data in diagnosing SDB and a limitation of administering the questionnaire?",
    options: [
      { label: 'A', text: 'Strength: data can be easily summarised; Limitation: low repeatability' },
      { label: 'B', text: 'Strength: accuracy of data obtained is high; Limitation: low internal validity' },
      { label: 'C', text: 'Strength: data is collected for the specific purpose of diagnosing SDB; Limitation: high reproducibility' },
      { label: 'D', text: 'Strength: data obtained will be highly detailed; Limitation: data is difficult to summarise' }
    ],
    correctAnswer: 'A',
    report: {
      stats: { 'A': 65, 'B': 10, 'C': 15, 'D': 10 },
      comment: "Questionnaires provide quantitative data that is easy to aggregate and summarise. However, self-report measures often suffer from low repeatability due to subjective bias or changing participant states."
    }
  },
  {
    id: '2025-B-9',
    year: '2025',
    section: 'B',
    number: '9',
    type: 'short-answer',
    marks: 10,
    unitAos: 'U3A2',
    text: "Question 9 (10 marks)\nThe method of loci is a mnemonic commonly used to increase the encoding, storage and retrieval of information. The diagram below illustrates the steps involved.\n\n1. Making a memory palace 2. Creating a path\n3. Encoding the list 4. Recalling the list\n\nCompare the method of loci mnemonic with those used by oral cultures, such as Aboriginal peoplesʼ use of songlines, and evaluate the ability of someone with aphantasia to use each mnemonic successfully. In your response, refer to the diagram provided.",
    correctAnswer: "Both mnemonics use spatial navigation and landmarks to anchor information. Songlines integrate narrative and Country, whereas method of loci uses a mental 'palace'. People with aphantasia (who lack mental imagery) would struggle with the method of loci as it relies heavily on visualising the palace, but might find songlines more accessible if they rely on narrative or physical navigation of Country.",
    imageUrl: 'https://picsum.photos/seed/vcaa-2025-q9/800/600',
    report: {
      maxMarks: 10,
      comment: "This extended response required a detailed comparison. Key points: use of spatial cues in both; the cultural/spiritual significance of songlines vs the purely cognitive nature of loci; and the impact of aphantasia on visual-dependent mnemonics."
    }
  },
  {
    id: '2025-A-1',
    year: '2025',
    section: 'A',
    number: '1',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Use the following information to answer Questions 1–5.\n\nA study explored which paper-folding techniques are more easily learnt by four-year-old children. Researchers observed 30 children in their kindergarten classrooms while the children folded paper. During the study, a piece of paper cuts a child's finger and the child quickly withdraws their hand.\n\nQuestion 1\nWhen the children are folding paper, their brains release a neurochemical that is involved in learning.\nThis neurochemical is most likely",
    options: [
      { label: 'A', text: 'GABA, as it causes feelings of wakefulness.' },
      { label: 'B', text: 'glutamate, as it prepares the body for action.' },
      { label: 'C', text: 'GABA, as it is the main excitatory neurotransmitter.' },
      { label: 'D', text: 'glutamate, as it helps strengthen synaptic connections.' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 5, 'B': 12, 'C': 8, 'D': 75 },
      comment: "Glutamate is the primary excitatory neurotransmitter in the brain and plays a crucial role in learning and memory by strengthening synaptic connections (long-term potentiation)."
    }
  },
  {
    id: '2025-A-2',
    year: '2025',
    section: 'A',
    number: '2',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Question 2\nThe memory of the fine motor skills required for paper-folding is stored in the",
    options: [
      { label: 'A', text: 'neocortex, because this is a semantic memory.' },
      { label: 'B', text: 'cerebellum, because this is an implicit memory.' },
      { label: 'C', text: 'basal ganglia, because this is an explicit memory.' },
      { label: 'D', text: 'hippocampus, because this is a procedural memory.' }
    ],
    correctAnswer: 'B',
    report: {
      stats: { 'A': 15, 'B': 70, 'C': 10, 'D': 5 },
      comment: "The cerebellum is involved in the storage of implicit memories, specifically procedural memories like fine motor skills."
    }
  },
  {
    id: '2025-A-3',
    year: '2025',
    section: 'A',
    number: '3',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 3\nWhich one of the following best describes the role of interneurons when the child withdrew their hand?",
    options: [
      { label: 'A', text: 'detecting harmful stimuli in the environment' },
      { label: 'B', text: 'transmitting motor messages by travelling to the cut site' },
      { label: 'C', text: 'sending information to the brain after the hand is withdrawn' },
      { label: 'D', text: 'relaying information between sensory neurons and motor neurons' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 5, 'B': 10, 'C': 15, 'D': 70 },
      comment: "Interneurons are located within the spinal cord and act as a relay between sensory neurons (which carry information from the environment) and motor neurons (which carry messages to muscles)."
    }
  },
  {
    id: '2025-A-4',
    year: '2025',
    section: 'A',
    number: '4',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 4\nWhich one of the following explains how quickly the child withdraws their hand from the paper?",
    options: [
      { label: 'A', text: 'It is a survival response that does not involve the brain.' },
      { label: 'B', text: 'It is an automatic response that does not involve sensory neurons.' },
      { label: 'C', text: 'It is a voluntary response carried out independently by the spinal cord.' },
      { label: 'D', text: 'It is an involuntary response that involves the neuron travelling a short distance.' }
    ],
    correctAnswer: 'A',
    report: {
      stats: { 'A': 80, 'B': 5, 'C': 5, 'D': 10 },
      comment: "The spinal reflex is an unconscious, involuntary and automatically occurring response to certain stimuli without any involvement of the brain. It is a survival mechanism that allows for a faster response."
    }
  },
  {
    id: '2025-A-5',
    year: '2025',
    section: 'A',
    number: '5',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 5\nWhich one of the following most accurately identifies the investigation methodology used in this study and one of its possible limitations?",
    options: [
      { label: 'A', text: 'simulation / time required to observe the children' },
      { label: 'B', text: 'system development / the short attention span of four-year-olds' },
      { label: 'C', text: 'fieldwork / controlling the presence of extraneous variables in the classroom' },
      { label: 'D', text: 'classification / inaccuracy when grouping the paper-folding techniques' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 9, 'B': 10, 'C': 76, 'D': 5 },
      comment: "76% of students correctly identified fieldwork. Fieldwork involves observing behavior in a natural setting (the classroom), and a common limitation is the difficulty in controlling extraneous variables in such environments."
    }
  },
  {
    id: '2025-A-6',
    year: '2025',
    section: 'A',
    number: '6',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Use the following information to answer Questions 6–9.\n\nA recent study investigated the effects of dark chocolate consumption on mood and gut microbiota diversity over a three-week period. Participants were allocated to one of three groups.\nGroup 1 – Participants consumed no dark chocolate.\nGroup 2 – Participants consumed 15 g of dark chocolate per day.\nGroup 3 – Participants consumed 30 g of dark chocolate per day.\nAnalysis of gut microbiota and a self-reported negative mood scale (where a score of 5 indicates a more negative mood) were completed before and after the three-week study.\n\nQuestion 6\nThe experimental design used in this study is a",
    options: [
      { label: 'A', text: 'mixed design.' },
      { label: 'B', text: 'correlational design.' },
      { label: 'C', text: 'within-subjects design.' },
      { label: 'D', text: 'between-subjects design.' }
    ],
    correctAnswer: 'A',
    imageUrl: 'https://picsum.photos/seed/vcaa-2025-q6/800/600',
    report: {
      stats: { 'A': 34, 'B': 8, 'C': 11, 'D': 47 },
      comment: "The study involved elements of both a between-subjects design (separate groups) and a within-subjects design (testing before and after). This is a mixed design."
    }
  },
  {
    id: '2025-A-7',
    year: '2025',
    section: 'A',
    number: '7',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 7\nWhy did the researchers analyse participants’ gut microbiota before the study began?",
    options: [
      { label: 'A', text: 'to provide a control group' },
      { label: 'B', text: 'to provide a controlled variable' },
      { label: 'C', text: 'to provide a confounding variable' },
      { label: 'D', text: 'to provide a baseline for comparison' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 10, 'B': 15, 'C': 5, 'D': 70 },
      comment: "Baseline data is collected before an intervention to allow researchers to compare the results after the intervention and determine if a change has occurred."
    }
  },
  {
    id: '2025-A-8',
    year: '2025',
    section: 'A',
    number: '8',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 8\nConsider the following conclusions.\nConclusion 1 – Consumption of 30 g of dark chocolate is associated with improved gut microbiota diversity.\nConclusion 2 – The gut–brain axis explains how the consumption of dark chocolate improves mood.\nConclusion 3 – Consumption of 15 g or 30 g of dark chocolate can increase negative mood over time.\n\nThe results of the study allow the researchers to draw which of the following?",
    options: [
      { label: 'A', text: 'conclusion 1 only' },
      { label: 'B', text: 'conclusion 3 only' },
      { label: 'C', text: 'conclusions 1 and 2 only' },
      { label: 'D', text: 'conclusions 1 and 3 only' }
    ],
    correctAnswer: 'A',
    report: {
      stats: { 'A': 35, 'B': 4, 'C': 53, 'D': 7 },
      comment: "Graph 2 demonstrates that Group 3 had a greater percentage increase in gut microbiota diversity. Conclusion 1 is valid. Conclusion 2 is an explanation, not a result. Conclusion 3 is contradicted by Graph 1."
    }
  },
  {
    id: '2025-A-9',
    year: '2025',
    section: 'A',
    number: '9',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 9\nWhich of the following best describes the data collected during this study?",
    options: [
      { label: 'A', text: 'primary and qualitative' },
      { label: 'B', text: 'primary and quantitative' },
      { label: 'C', text: 'secondary and qualitative' },
      { label: 'D', text: 'secondary and quantitative' }
    ],
    correctAnswer: 'B',
    report: {
      stats: { 'A': 5, 'B': 85, 'C': 5, 'D': 5 },
      comment: "The data was collected directly by the researchers (primary) and involved numerical measurements of gut microbiota and a mood scale (quantitative)."
    }
  },
  {
    id: '2025-A-10',
    year: '2025',
    section: 'A',
    number: '10',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 10\nWhen rushing to class, a student falls over.\nAccording to the General Adaptation Syndrome (GAS) model, which one of the following best identifies the stage and the resistance to stress when this student first loses balance?",
    options: [
      { label: 'A', text: 'alarm reaction (shock) / above normal' },
      { label: 'B', text: 'alarm reaction (shock) / below normal' },
      { label: 'C', text: 'alarm reaction (counter shock) / below normal' },
      { label: 'D', text: 'alarm reaction (counter shock) / above normal' }
    ],
    correctAnswer: 'B',
    report: {
      stats: { 'A': 12, 'B': 68, 'C': 15, 'D': 5 },
      comment: "In the shock phase of the alarm reaction stage, the body's resistance to stress falls below normal levels."
    }
  },
  {
    id: '2025-A-11',
    year: '2025',
    section: 'A',
    number: '11',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Use the following information to answer Questions 11 and 12.\n\nMindfulness meditation can help to manage stress resulting from chronic health challenges such as pain and fatigue. Researchers are attempting to link mindfulness meditation to the GAS model.\n\nQuestion 11\nMindfulness meditation can help individuals cope with stress. The researchers could link this to the GAS model because mindfulness meditation can",
    options: [
      { label: 'A', text: 'accelerate the transition into the exhaustion stage.' },
      { label: 'B', text: 'eliminate the physiological responses in the alarm reaction stage.' },
      { label: 'C', text: 'cause cortisol levels to fall below normal during the resistance stage.' },
      { label: 'D', text: 'draw attention to the physiological stress response during the alarm reaction stage.' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 5, 'B': 10, 'C': 15, 'D': 70 },
      comment: "Mindfulness involves acknowledging the physiological stress response as it happens, which aligns with drawing attention to the response during the alarm reaction stage."
    }
  },
  {
    id: '2025-A-13',
    year: '2025',
    section: 'A',
    number: '13',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Use the following information to answer Questions 13–16.\n\nAn experiment tested whether playing calming music can reduce the stress experienced by cows when a human approaches them. After many trials, the presence of a human had a calming effect on the cows.\n\nQuestion 13\nAccording to behaviourist approaches, when should the calming music be played to improve the cows’ chances of learning?",
    options: [
      { label: 'A', text: 'It should be played at all times.' },
      { label: 'B', text: 'It should start playing while a human approaches.' },
      { label: 'C', text: 'It should be played directly after the cows see a human.' },
      { label: 'D', text: 'It should start playing directly before the cows see a human.' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 5, 'B': 15, 'C': 10, 'D': 70 },
      comment: "In classical conditioning, the neutral stimulus (music) should be presented immediately before the unconditioned stimulus (human approach) to create the strongest association."
    }
  },
  {
    id: '2025-A-18',
    year: '2025',
    section: 'A',
    number: '18',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A3',
    text: "Question 18\nWhich one of the following Indigenous Australian practices could be used to research Aboriginal and Torres Strait Islander ways of knowing?",
    options: [
      { label: 'A', text: 'modelling' },
      { label: 'B', text: 'yarning circles' },
      { label: 'C', text: 'navigational tracks' },
      { label: 'D', text: 'relationships with people' }
    ],
    correctAnswer: 'B',
    report: {
      stats: { 'A': 5, 'B': 85, 'C': 5, 'D': 5 },
      comment: "Yarning circles are a traditional Indigenous practice used for sharing knowledge and can be applied as a research methodology."
    }
  },
  {
    id: '2025-A-34',
    year: '2025',
    section: 'A',
    number: '34',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A2',
    text: "Question 34\nWhich one of the following accurately distinguishes between stress and anxiety?",
    options: [
      { label: 'A', text: 'Stress generally influences affective functions, while anxiety influences cognitive processes.' },
      { label: 'B', text: 'Stress only activates the flight-or-fight response, while anxiety only activates the freeze response.' },
      { label: 'C', text: 'Stress arises from internal or external challenges, while anxiety arises from apprehension about potential threats.' },
      { label: 'D', text: 'Stress is likely to have short-term psychological impacts, while anxiety has less significant long-term physiological impacts.' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 10, 'B': 5, 'C': 75, 'D': 10 },
      comment: "Stress is a response to a known external or internal stressor, whereas anxiety is a state of physiological arousal associated with feelings of apprehension, worry or uneasiness that something is wrong or that something unpleasant is about to happen."
    }
  },
  {
    id: '2025-A-12',
    year: '2025',
    section: 'A',
    number: '12',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 12\nWhich one of the following identifies the role of cortisol in the resistance stage of the GAS model?",
    options: [
      { label: 'A', text: 'It decreases blood glucose levels.' },
      { label: 'B', text: 'It increases the body’s immunity to disease.' },
      { label: 'C', text: 'It provides the body with energy to deal with the stressor.' },
      { label: 'D', text: 'It activates the parasympathetic nervous system to calm the body.' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 5, 'B': 10, 'C': 80, 'D': 5 },
      comment: "Cortisol's primary role during the resistance stage is to maintain high blood glucose levels to provide the body with the energy needed to continue dealing with the stressor."
    }
  },
  {
    id: '2025-A-14',
    year: '2025',
    section: 'A',
    number: '14',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Question 14\nIn the experiment, what was the unconditioned stimulus (UCS)?",
    options: [
      { label: 'A', text: 'the cows' },
      { label: 'B', text: 'the calming music' },
      { label: 'C', text: 'the human approach' },
      { label: 'D', text: 'the cows’ calming response' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 5, 'B': 15, 'C': 75, 'D': 5 },
      comment: "The unconditioned stimulus is the one that naturally and automatically triggers a response. In this scenario, the human approach naturally causes a response in the cows."
    }
  },
  {
    id: '2025-A-15',
    year: '2025',
    section: 'A',
    number: '15',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Question 15\nAfter many trials, the cows became calm when they heard the music. This calming response to the music is the",
    options: [
      { label: 'A', text: 'neutral stimulus.' },
      { label: 'B', text: 'conditioned stimulus.' },
      { label: 'C', text: 'unconditioned response.' },
      { label: 'D', text: 'conditioned response.' }
    ],
    correctAnswer: 'D',
    report: {
      stats: { 'A': 5, 'B': 10, 'C': 10, 'D': 75 },
      comment: "The conditioned response is the learned response to the previously neutral stimulus (the music)."
    }
  },
  {
    id: '2025-A-16',
    year: '2025',
    section: 'A',
    number: '16',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A2',
    text: "Question 16\nIf the researchers stopped playing the music but the human continued to approach the cows, what would most likely happen to the cows’ calming response to the music?",
    options: [
      { label: 'A', text: 'extinction' },
      { label: 'B', text: 'spontaneous recovery' },
      { label: 'C', text: 'stimulus generalisation' },
      { label: 'D', text: 'stimulus discrimination' }
    ],
    correctAnswer: 'A',
    report: {
      stats: { 'A': 80, 'B': 5, 'C': 5, 'D': 10 },
      comment: "Extinction occurs when the conditioned stimulus (music) is repeatedly presented without the unconditioned stimulus (human approach), leading to a gradual decrease and eventual disappearance of the conditioned response."
    }
  },
  {
    id: '2025-A-17',
    year: '2025',
    section: 'A',
    number: '17',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A1',
    text: "Question 17\nWhich one of the following is a characteristic of a person in a state of high mental wellbeing?",
    options: [
      { label: 'A', text: 'experiencing no stress' },
      { label: 'B', text: 'having a fixed mindset' },
      { label: 'C', text: 'displaying resilience' },
      { label: 'D', text: 'avoiding all social interactions' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 5, 'B': 5, 'C': 85, 'D': 5 },
      comment: "Resilience, the ability to cope with and adapt to life's stressors, is a key characteristic of high mental wellbeing."
    }
  },
  {
    id: '2025-A-19',
    year: '2025',
    section: 'A',
    number: '19',
    type: 'mcq',
    marks: 1,
    unitAos: 'U4A1',
    text: "Use the following information to answer Questions 19–21.\n\nA study investigated the effects of a new sleep medication on the sleep–wake patterns of 50 adults with insomnia. Participants were randomly assigned to either a treatment group (receiving the medication) or a control group (receiving a placebo).\n\nQuestion 19\nThe use of a placebo in this study is intended to",
    options: [
      { label: 'A', text: 'eliminate the need for a control group.' },
      { label: 'B', text: 'ensure that all participants receive the medication.' },
      { label: 'C', text: 'control for the participants’ expectations about the treatment.' },
      { label: 'D', text: 'guarantee that the results are statistically significant.' }
    ],
    correctAnswer: 'C',
    report: {
      stats: { 'A': 5, 'B': 5, 'C': 85, 'D': 5 },
      comment: "A placebo is an inactive substance used to control for the placebo effect, where participants' expectations can influence the results of a study."
    }
  },
  {
    id: '2025-B-1-a',
    year: '2025',
    section: 'B',
    number: '1a',
    type: 'short-answer',
    marks: 2,
    unitAos: 'U3A1',
    text: "Question 1\nThermoregulation allows the human body to keep its temperature within a certain range. The body can respond to temperature changes through conscious and unconscious responses.\n\ni. Provide an example of both a conscious and unconscious response in a high-temperature environment.",
    correctAnswer: "Conscious: Removing a layer of clothing or moving to the shade. Unconscious: Sweating or vasodilation of blood vessels near the skin.",
    report: {
      maxMarks: 2,
      comment: "Students needed to provide one example of a conscious response (e.g. turning on a fan) and one example of an unconscious response (e.g. sweating) specifically for a high-temperature environment."
    }
  },
  {
    id: '2025-B-1-b',
    year: '2025',
    section: 'B',
    number: '1b',
    type: 'short-answer',
    marks: 2,
    unitAos: 'U3A1',
    text: "Question 1b\nContrast neurotransmitters and neuromodulators.",
    correctAnswer: "Neurotransmitters carry messages between specific neurons across a synapse for rapid, short-lived effects. Neuromodulators are released into a larger area to influence the activity of many neurons over a longer period.",
    report: {
      maxMarks: 2,
      comment: "A contrast requires identifying differences. Neurotransmitters typically have a fast, localized effect on a single postsynaptic neuron, while neuromodulators have a slower, more widespread effect on a population of neurons."
    }
  },
  {
    id: '2025-B-2-a',
    year: '2025',
    section: 'B',
    number: '2a',
    type: 'short-answer',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 2\nWidespread research is being conducted on how gut microbiota might influence Alzheimer’s disease through the gut–brain axis.\n\na. Identify one role of gut microbiota in the human body.",
    correctAnswer: "Regulating the immune system, breaking down complex carbohydrates, or producing certain vitamins and neurotransmitters.",
    report: {
      maxMarks: 1,
      comment: "Students could identify roles such as: metabolic functions (e.g. vitamin synthesis), protective functions (e.g. preventing pathogen growth), or structural functions (e.g. maintaining the intestinal barrier)."
    }
  },
  {
    id: '2025-B-3-a',
    year: '2025',
    section: 'B',
    number: '3a',
    type: 'short-answer',
    marks: 2,
    unitAos: 'U4A1',
    text: "Question 3\nAfter learning about sleep–wake patterns, a student constructed the following model to show the sleep cycle of an adult human.\n\na. Identify two limitations of the student’s model.",
    correctAnswer: "1. The model does not show the proportion of time spent in each stage (e.g., NREM2 is the longest). 2. It implies a strict linear sequence without accounting for awakening periods or variations across the night.",
    imageUrl: 'https://picsum.photos/seed/vcaa-2025-q3a/800/400',
    report: {
      averageMarks: 0.9,
      maxMarks: 2,
      comment: "Students were asked to identify two limitations. Accepted limitations included: inaccurate representation of time spent in stages; no indication of REM/NREM proportion changes; implication of strict linear sequence; absence of awakening periods."
    }
  },
  {
    id: '2025-B-4-a',
    year: '2025',
    section: 'B',
    number: '4a',
    type: 'short-answer',
    marks: 2,
    unitAos: 'U3A2',
    text: "Question 4\nA student is trying to remember the names of the cranial nerves for their biology exam. They use the acronym 'On Old Olympus' Towering Tops...' to help them.\n\na. Identify the type of mnemonic device being used and explain how it assists memory.",
    correctAnswer: "Acrostic. It assists memory by providing a meaningful phrase where the first letter of each word acts as a retrieval cue for the information to be remembered.",
    report: {
      maxMarks: 2,
      comment: "Students needed to identify the mnemonic as an acrostic. The explanation should focus on the first letters acting as retrieval cues to aid encoding and retrieval."
    }
  },
  {
    id: '2025-B-5-a',
    year: '2025',
    section: 'B',
    number: '5a',
    type: 'short-answer',
    marks: 3,
    unitAos: 'U3A1',
    text: "Question 5\nExplain the role of the sympathetic nervous system in the 'fight-flight-freeze' response.",
    correctAnswer: "The sympathetic nervous system activates physiological changes (e.g., increased heart rate, suppressed digestion) to prepare the body for immediate action to either confront or flee from a threat. It is an adaptive survival mechanism.",
    report: {
      maxMarks: 3,
      comment: "A high-scoring response described the activation of the sympathetic nervous system, listed specific physiological changes, and linked these to the purpose of survival (preparing for action)."
    }
  },
  {
    id: '2024-A-1',
    year: '2024',
    section: 'A',
    number: '1',
    type: 'mcq',
    marks: 1,
    unitAos: 'U3A1',
    text: "Question 1\nWhich one of the following is a function of the somatic nervous system?",
    options: [
      { label: 'A', text: 'initiating the fight-flight-freeze response' },
      { label: 'B', text: 'transmitting sensory information to the central nervous system' },
      { label: 'C', text: 'regulating the activity of internal organs and glands' },
      { label: 'D', text: 'maintaining the body’s internal environment in a steady state' }
    ],
    correctAnswer: 'B',
    report: {
      stats: { 'A': 5, 'B': 82, 'C': 8, 'D': 5 },
      comment: "The somatic nervous system is responsible for carrying sensory information to the CNS and motor information from the CNS to skeletal muscles."
    }
  },
  {
    id: '2024-B-2-a',
    year: '2024',
    section: 'B',
    number: '2a',
    type: 'short-answer',
    marks: 2,
    unitAos: 'U3A2',
    text: "Question 2\nDistinguish between maintenance rehearsal and elaborative rehearsal.",
    correctAnswer: "Maintenance rehearsal involves simple repetition of information to keep it in short-term memory, whereas elaborative rehearsal involves linking new information to existing knowledge in long-term memory for deeper encoding.",
    report: {
      maxMarks: 2,
      comment: "A distinction requires a clear difference. Maintenance is for duration in STM; elaborative is for meaningful encoding into LTM."
    }
  },
  {
    id: '2025-B-8',
    year: '2025',
    section: 'B',
    number: '8',
    type: 'short-answer',
    marks: 5,
    unitAos: 'U3A2',
    text: "Question 8\nChildren learn how to hold a pencil at an early age. As they develop writing skills, this grip is improved to allow them to form letters. The images below show the development over time of a child’s grip on a pencil.\n\nExplain how long-term potentiation and long-term depression work together to modify the connections between neurons as a child learns to hold a pencil.",
    correctAnswer: "Long-term potentiation (LTP) strengthens the synaptic connections for the correct grip through repeated use, making the neural pathway more efficient. Long-term depression (LTD) weakens or eliminates the synaptic connections for the incorrect or inefficient grip patterns that are no longer being used. Together, they 'sculpt' the neural pathways to refine the motor skill.",
    imageUrl: 'https://picsum.photos/seed/vcaa-2025-q8/800/400',
    report: {
      maxMarks: 5,
      comment: "A high-scoring response needed to define both LTP and LTD and explain their complementary roles in motor learning. LTP strengthens relevant pathways while LTD weakens irrelevant ones, allowing for the refinement of the pencil grip."
    }
  }
];
