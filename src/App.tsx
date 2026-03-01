import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, Sparkles, ChevronRight, CheckCircle2, AlertCircle, RefreshCcw, Star, BookOpen, BrainCircuit } from 'lucide-react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { EXAM_QUESTIONS, type Question } from './data/questions';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'question' | 'feedback' | 'score-request' | 'scaffold';
  questionId?: string;
  scaffoldLevel?: 'foundation' | 'medium' | 'high';
  imageUrl?: string;
}

const VCE_UNITS = [
  { id: 'U3', name: 'Unit 3: How does experience affect behaviour and mental processes?' },
  { id: 'U4', name: 'Unit 4: How is wellbeing developed and maintained?' }
];

const VCE_AOS = {
  'U3': [
    { id: 'U3A1', name: 'AOS 1: Nervous system and stress' },
    { id: 'U3A2', name: 'AOS 2: Learning and memory' }
  ],
  'U4': [
    { id: 'U4A1', name: 'AOS 1: Sleep and consciousness' },
    { id: 'U4A2', name: 'AOS 2: Mental wellbeing' },
    { id: 'U4A3', name: 'AOS 3: Research methods (Practical investigation)' }
  ]
};

// Topic mapping based on the Python script
function mapToTopic(questionId: string): string {
  if (questionId.includes('A-1')) return "Role of neurotransmitters in the transmission of neural information";
  if (questionId.includes('A-2')) return "Role of the cerebellum in the storage of implicit memories";
  if (questionId.includes('A-3') || questionId.includes('A-4')) return "The spinal reflex as an unconscious and involuntary response";
  if (questionId.includes('A-5')) return "Characteristics of scientific methodology and identification of variables";
  if (questionId.includes('A-6')) return "Research design: mixed, between-subjects and within-subjects designs";
  if (questionId.includes('A-7')) return "Techniques of primary quantitative data generation";
  if (questionId.includes('A-8')) return "Nature of evidence that supports or refutes a hypothesis";
  if (questionId.includes('A-9')) return "Ethical guidelines in psychological research";
  if (questionId.includes('A-10')) return "The General Adaptation Syndrome (GAS) as a biological model of stress";
  if (questionId.includes('A-11')) return "Mindfulness meditation as a strategy for coping with stress";
  if (questionId.includes('A-12')) return "The role of cortisol in the resistance stage of the GAS model";
  if (questionId.includes('A-13')) return "Classical conditioning as a three-phase process";
  if (questionId.includes('A-14') || questionId.includes('A-15') || questionId.includes('A-16')) return "Classical conditioning: UCS, UCR, NS, CS, CR, and extinction";
  if (questionId.includes('A-17')) return "Characteristics of high mental wellbeing including resilience";
  if (questionId.includes('A-18')) return "Aboriginal and Torres Strait Islander ways of knowing";
  if (questionId.includes('A-19')) return "Placebos and the placebo effect in psychological research";
  if (questionId.includes('A-34')) return "Distinction between stress, phobia and anxiety";
  if (questionId.includes('B-1')) return "Thermoregulation and the role of the nervous system";
  if (questionId.includes('B-2')) return "The gut-brain axis and the role of gut microbiota";
  if (questionId.includes('B-3')) return "Sleep-wake patterns and models of the sleep cycle";
  if (questionId.includes('B-4')) return "Mnemonic devices and their role in memory";
  if (questionId.includes('B-5')) return "The role of the sympathetic nervous system in stress";
  if (questionId.includes('B-8')) return "Neural plasticity: Long-term potentiation and long-term depression";
  if (questionId.includes('B-9')) return "Mnemonic devices: Method of loci vs Songlines";
  if (questionId.includes('2023-A-1')) return "Conscious, unconscious and spinal reflex responses";
  if (questionId.includes('2023-B-1')) return "Physiological responses to stress";
  if (questionId.includes('2024-A-1')) return "Functions of the somatic nervous system";
  if (questionId.includes('2024-B-1')) return "Role of the basal ganglia and neocortex in motor learning";
  if (questionId.includes('2024-B-2')) return "Rehearsal techniques: maintenance vs elaborative";
  if (questionId.includes('2025-A-20')) return "Strengths and limitations of sleep research methodologies";
  
  return "Scientific investigation methodology and research design";
}

// Evaluation logic based on the Python script
function evaluateResponse(studentAnswer: string, examinerText: string): 'foundation' | 'medium' | 'high' {
  if (!examinerText.trim()) return "medium";

  const studentLower = studentAnswer.toLowerCase();
  const examinerTerms = examinerText.toLowerCase().split(/\s+/).filter(t => t.length > 3);
  
  if (examinerTerms.length === 0) return "medium";

  const matched = examinerTerms.filter(term => studentLower.includes(term)).length;
  const coverage = matched / examinerTerms.length;

  if (coverage < 0.15) return "foundation"; 
  if (coverage < 0.4) return "medium";
  return "high";
}

const SYSTEM_INSTRUCTION = `You are a fun, energetic, and highly engaging VCE Psychology Teacher specializing in Units 3 and 4.
Your goal is to help students master the VCE Psychology curriculum using ONLY real VCAA exam questions, while making the process feel like a high-energy classroom session!

CRITICAL RULES:
1. NEVER GENERATE YOUR OWN QUESTIONS. You MUST ONLY use the questions provided in the EXAM_QUESTIONS data bank.
2. USE THE WHOLE QUESTION VERBATIM. DO NOT cut down, paraphrase, or shorten the question text. Present it exactly as it appears in the data bank.
3. If you are asked for a question, pick one from the EXAM_QUESTIONS list that matches the student's selected Area of Study. AIM FOR A VARIETY of both Multiple Choice and Short Answer questions throughout the session.
4. ALWAYS state the mark allocation when presenting a question (e.g., "This is a 1-mark question from the 2025 VCAA exam.").
5. For Multiple Choice Questions (MCQ):
   - Present the question text first.
   - ALWAYS put each option (A, B, C, D) on its own separate line.
   - Use this EXACT format for options:
     A. [Option text]
     B. [Option text]
     C. [Option text]
     D. [Option text]
   - Ensure there is a blank line between the question and the first option, and a blank line between each option for maximum readability.
   - If the student is wrong, do NOT give the answer immediately. Provide a hint based on the VCAA Examiner's Report comments.
   - NEVER give the correct answer on the first or second wrong attempt. Instead, guide them with leading questions or hints about the key terms they missed.
   - **IF A STUDENT IS REALLY STUCK**: Provide accurate, textbook-standard definitions for the key terms involved to help them bridge the gap.
   - Once they get it right, share the official VCAA statistics (e.g., "75% of students got this right") and the examiner's explanation.
6. For Short Answer Questions:
   - Present the question and marks.
   - Use "Scaffolding": If their first attempt is incomplete, point out which part of the VCAA marking criteria they missed based on the report comment.
   - DO NOT provide the full correct answer if they miss marks. Instead, tell them what's missing (e.g., "You've got the identification right, but remember to link it back to the scenario!") and ask them to try again.
   - **IF A STUDENT IS REALLY STUCK**: Provide accurate, textbook-standard definitions for the key terms involved to help them bridge the gap.
   - After a high-quality response is achieved, ask the student to self-score based on the provided VCAA marking guide/report.
7. INTEGRATE RESEARCH METHODS: Regardless of the selected topic, occasionally interject with Unit 4 Area of Study 3 (Research Methods) questions as these are critical for the VCE exam.
8. PERSONA & TONE:
   - Sound like the "cool" teacher who loves their subject.
   - Use high-energy, fun, and encouraging language (e.g., "Boom! Spot on!", "You're absolutely crushing this!", "Let's get those neurons firing!").
   - Occasionally use relatable (but professional) psych-related humor or analogies to keep things light.
   - Respond with enthusiastic praise when a student makes progress.
   - Maintain professional accuracy and VCE-specific terminology, but deliver it with a smile!
9. DO NOT repeat topic selection options once a session has started. Focus entirely on the chat and the questions.
`;

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [sessionState, setSessionState] = useState<'selecting' | 'chatting' | 'answering' | 'scoring'>('selecting');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedAos, setSelectedAos] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, sessionState]);

  // Check for daily selection on mount
  useEffect(() => {
    const checkDailySelection = () => {
      const saved = localStorage.getItem('vce_psych_daily_selection');
      const today = new Date().toISOString().split('T')[0];

      if (saved) {
        try {
          const { unitId, aosId, date } = JSON.parse(saved);
          if (date === today) {
            setSelectedUnit(unitId);
            setSelectedAos(aosId);
            setSessionState('chatting');
            
            const aosName = VCE_AOS[unitId as keyof typeof VCE_AOS]?.find(a => a.id === aosId)?.name;
            setMessages([
              {
                id: '1',
                role: 'assistant',
                content: `Boom! Welcome back! 🧠 We're diving back into **${aosName || 'Research Methods'}** today. Ready to get those neurons firing and crush some VCAA challenges?`,
                type: 'text'
              }
            ]);
            return;
          }
        } catch (e) {
          console.error("Error parsing daily selection", e);
        }
      }
      
      // No selection for today - ensure we are in selecting state
      setSessionState('selecting');
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hey there, Psych superstar! 🌟 Ready to master Units 3 & 4? Pick your Area of Study below and let's get this brain-party started! Don't forget, we'll be weaving in some **Unit 4 AOS 3 (Research Methods)** along the way because that's where the real magic happens! ✨",
          type: 'text'
        }
      ]);
    };

    checkDailySelection();
  }, []);

  const handleReset = () => {
    localStorage.removeItem('vce_psych_daily_selection');
    window.location.reload();
  };

  const handleStart = (unitId: string, aosId: string) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('vce_psych_daily_selection', JSON.stringify({ unitId, aosId, date: today }));
    
    setSelectedUnit(unitId);
    setSelectedAos(aosId);
    setSessionState('chatting');
    
    const aosName = VCE_AOS[unitId as keyof typeof VCE_AOS].find(a => a.id === aosId)?.name;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `I'd like to focus on ${aosName} today.`
    };
    
    setMessages(prev => [...prev, userMsg]);
    // Pass the intended next state to handleSend to avoid stale closure issues
    handleSend(`I have selected ${aosName}. Please start with a question from this area.`, true, 'chatting');
  };

  const handleSend = async (text: string = input, skipUserMsg: boolean = false, forceState?: 'chatting' | 'answering' | 'scoring') => {
    if (!text.trim() || isLoading) return;

    if (!skipUserMsg) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text
      };
      setMessages(prev => [...prev, userMessage]);
    }
    
    setInput('');
    setIsLoading(true);

    // Use forceState if provided, otherwise fallback to current sessionState
    const effectiveState = forceState || sessionState;

    try {
      let scaffoldLevel: 'foundation' | 'medium' | 'high' | undefined;
      if (effectiveState === 'answering' && currentQuestion) {
        scaffoldLevel = evaluateResponse(text, currentQuestion.report.comment);
      }

      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text }] }
        ],
        config: {
          systemInstruction: `${SYSTEM_INSTRUCTION}
          
          CONTEXT:
          - Selected Unit: ${selectedUnit}
          - Selected AOS: ${selectedAos}
          - CURRENT STATE: ${effectiveState}
          - CURRENT QUESTION: ${currentQuestion ? JSON.stringify(currentQuestion) : 'None'}
          - EVALUATED SCAFFOLD LEVEL: ${scaffoldLevel || 'N/A'}
          
          AVAILABLE VCAA QUESTIONS (ONLY USE THESE):
          ${JSON.stringify(EXAM_QUESTIONS)}`,
        }
      });

      const botContent = response.text || "I'm sorry, I couldn't generate a response.";
      
      let nextState = effectiveState;
      let detectedQuestion: Question | null = currentQuestion;

      if (botContent.toLowerCase().includes('rate your understanding') || botContent.includes('1 to 5')) {
        nextState = 'scoring';
      } else if (EXAM_QUESTIONS.some(q => botContent.includes(q.text.substring(0, 20)))) {
        nextState = 'answering';
        const found = EXAM_QUESTIONS.find(q => botContent.includes(q.text.substring(0, 20)));
        if (found) {
          detectedQuestion = found;
          setCurrentQuestion(found);
        }
      } else if (effectiveState === 'scoring') {
        nextState = 'chatting';
      } else if (effectiveState === 'selecting') {
        // Safety transition if somehow we were still in selecting
        nextState = 'chatting';
      }

      setSessionState(nextState);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: botContent,
        type: nextState === 'scoring' ? 'score-request' : (nextState === 'answering' ? 'question' : 'text'),
        scaffoldLevel: scaffoldLevel,
        imageUrl: detectedQuestion?.imageUrl,
        questionId: detectedQuestion?.id
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I encountered an error. Please try again.",
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScore = (score: number) => {
    handleSend(`I'd rate my understanding as a ${score} out of 5.`);
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden border-x border-black/5">
      {/* Header */}
      <header className="px-6 py-4 bg-pink-400 text-white border-b border-pink-500 flex items-center justify-between z-10 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight">Miss Ali’s Brain Gains Gym</h1>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-white/80">Units 3 & 4 • VCAA Specialist</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={cn(
            "hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white",
          )}>
            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse bg-white")} />
            {sessionState}
          </div>
          <button 
            onClick={handleReset}
            className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/80 hover:text-white"
            title="Reset Daily Focus"
          >
            <RefreshCcw size={16} />
          </button>
        </div>
      </header>

      {/* Topic Banner */}
      {currentQuestion && (
        <div className="px-6 py-2 bg-pink-500 text-white flex items-center justify-between gap-3 overflow-hidden">
          <div className="flex items-center gap-3 overflow-hidden">
            <BookOpen size={14} className="shrink-0 text-white/60" />
            <div className="text-[10px] uppercase tracking-wider font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              Study Design: {mapToTopic(currentQuestion.id)}
            </div>
          </div>
          <div className="shrink-0 px-2 py-0.5 bg-white/20 rounded text-[10px] font-bold uppercase tracking-tight">
            {currentQuestion.marks} {currentQuestion.marks === 1 ? 'Mark' : 'Marks'}
          </div>
        </div>
      )}

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-pink-50/30">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4",
                message.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1",
                message.role === 'user' ? "bg-pink-400 text-white" : "bg-white border border-pink-200 text-pink-400"
              )}>
                {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={cn(
                "max-w-[85%] space-y-2",
                message.role === 'user' ? "items-end" : "items-start"
              )}>
                {message.scaffoldLevel && (
                  <div className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-tight mb-1",
                    message.scaffoldLevel === 'foundation' ? "bg-blue-100 text-blue-700" :
                    message.scaffoldLevel === 'medium' ? "bg-amber-100 text-amber-700" :
                    "bg-emerald-100 text-emerald-700"
                  )}>
                    <BrainCircuit size={10} />
                    VCAA Scaffolding: {message.scaffoldLevel}
                  </div>
                )}
                
                <div className={cn(
                  "px-4 py-3 rounded-2xl text-sm shadow-sm",
                  message.role === 'user' 
                    ? "bg-pink-400 text-white rounded-tr-none" 
                    : "bg-white border border-pink-100 rounded-tl-none"
                )}>
                  <div className="markdown-body">
                    <Markdown>{message.content}</Markdown>
                  </div>
                  {message.imageUrl && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-black/5 shadow-sm">
                      <img 
                        src={message.imageUrl} 
                        alt="Question visual aid" 
                        className="w-full h-auto object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>

                {message.type === 'score-request' && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleScore(s)}
                        disabled={isLoading}
                        className="flex items-center gap-1.5 px-4 py-2 bg-white border border-black/10 rounded-xl hover:bg-black hover:text-white transition-all text-xs font-medium group"
                      >
                        <Star size={12} className={cn("group-hover:fill-current", s <= 3 ? "text-amber-500" : "text-emerald-500")} />
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sessionState === 'selecting' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-lg bg-white border border-black/10 text-black flex items-center justify-center shrink-0 mt-1">
                <Bot size={16} />
              </div>
              <div className="max-w-[85%] p-6 bg-white border border-pink-100 rounded-2xl rounded-tl-none shadow-sm space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-lg font-semibold text-pink-900">Daily Focus Selection</h2>
                  <p className="text-xs text-pink-800/60">Choose your Area of Study for today's VCAA practice.</p>
                </div>
                
                <div className="grid gap-6">
                  {VCE_UNITS.map(unit => (
                    <div key={unit.id} className="space-y-3">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-black/30 px-1 border-l-2 border-black/10 ml-1">{unit.name}</h3>
                      <div className="grid gap-2">
                        {VCE_AOS[unit.id as keyof typeof VCE_AOS].map(aos => (
                          <button
                            key={aos.id}
                            onClick={() => handleStart(unit.id, aos.id)}
                            className="flex items-center justify-between px-4 py-3 bg-pink-50/50 hover:bg-pink-400 hover:text-white rounded-xl transition-all text-left group border border-pink-100"
                          >
                            <span className="text-sm font-medium">{aos.name}</span>
                            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading && (
          <div className="flex gap-4 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-black/5 shrink-0" />
            <div className="space-y-2">
              <div className="h-4 bg-black/5 rounded-full w-48" />
              <div className="h-4 bg-black/5 rounded-full w-32" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Input Area */}
      <footer className="p-6 bg-white border-t border-pink-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={sessionState === 'answering' ? "Type your answer (A, B, C, D or text)..." : "Type a message..."}
            className="w-full pl-4 pr-12 py-4 bg-pink-50/50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-pink-500/20 transition-all outline-none"
            disabled={isLoading || sessionState === 'selecting'}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || sessionState === 'selecting'}
            className="absolute right-2 p-2 bg-pink-400 text-white rounded-xl hover:bg-pink-500 disabled:opacity-30 transition-all shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="mt-3 text-[10px] text-center text-pink-900/30 font-medium uppercase tracking-wider">
          VCAA Specialist Mode • Units 3 & 4 Study Design (2023-2027)
        </p>
      </footer>
    </div>
  );
}
