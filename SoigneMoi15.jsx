import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// 🎨 PREMIUM MED-TECH THEME — Neon green + dark luxe
// ═══════════════════════════════════════════════════════════════
const LT = {
  bg:"#F0F4F1",card:"#FFFFFF",card2:"#F7FAF8",surface:"#E8EDE9",
  border:"#D0DDD4",borderLight:"#E0EAE3",text:"#0A1F10",textSoft:"#1A3322",
  sec:"#4A6B52",ter:"#8AAA92",
  accent:"#00E676",accentDark:"#00C853",accentSoft:"#E0FFF0",accentBorder:"#80F0B8",accentGlow:"rgba(0,230,118,.25)",
  neon:"#00FF88",neonDim:"#00E676",
  green:"#00C853",greenSoft:"#E0F9EA",greenBorder:"#80E8A8",
  blue:"#2979FF",blueSoft:"#E3F0FF",blueBorder:"#90C0FF",
  amber:"#FF8F00",amberSoft:"#FFF3E0",amberBorder:"#FFD090",
  purple:"#7C4DFF",purpleSoft:"#F0EAFF",purpleBorder:"#C0A8FF",
  danger:"#FF3D00",dangerSoft:"#FFF0EA",dangerBorder:"#FFB090",
  input:"#F2F7F3",inputFocus:"#E4EDE6",inputBorder:"#C8D8CC",
  shadow:"0 2px 8px rgba(0,40,20,.06)",shadowMd:"0 8px 24px rgba(0,40,20,.08)",shadowLg:"0 16px 48px rgba(0,40,20,.12)",
  glow:"0 0 20px rgba(0,230,118,.15)",glowStrong:"0 0 40px rgba(0,230,118,.2)",
  gradient:"linear-gradient(135deg,#00E676,#00C853,#00BFA5)",
  gradientDark:"linear-gradient(135deg,#0A1F10,#122A18)",
};
const DK = {
  bg:"#060E08",card:"#0C1A10",card2:"#101E14",surface:"#081210",
  border:"#1A2E20",borderLight:"#1E3424",text:"#E8F5EC",textSoft:"#C0D8C8",
  sec:"#78A888",ter:"#406850",
  accent:"#00FF88",accentDark:"#00E676",accentSoft:"#0A2818",accentBorder:"#1A4828",accentGlow:"rgba(0,255,136,.3)",
  neon:"#00FF88",neonDim:"#00E676",
  green:"#00E676",greenSoft:"#0A2818",greenBorder:"#1A4828",
  blue:"#448AFF",blueSoft:"#0A1828",blueBorder:"#1A3048",
  amber:"#FFB300",amberSoft:"#281A08",amberBorder:"#483010",
  purple:"#B388FF",purpleSoft:"#1A1028",purpleBorder:"#2A1848",
  danger:"#FF6E40",dangerSoft:"#280A08",dangerBorder:"#481810",
  input:"#0E1A12",inputFocus:"#142218",inputBorder:"#243828",
  shadow:"0 2px 8px rgba(0,0,0,.3)",shadowMd:"0 8px 24px rgba(0,0,0,.4)",shadowLg:"0 16px 48px rgba(0,0,0,.5)",
  glow:"0 0 20px rgba(0,255,136,.2)",glowStrong:"0 0 40px rgba(0,255,136,.3)",
  gradient:"linear-gradient(135deg,#00FF88,#00E676,#00BFA5)",
  gradientDark:"linear-gradient(135deg,#060E08,#0C1A10)",
};

// ═══════════════════════════════════════════════════════════════
// 📸 REAL PHOTOS (Unsplash)
// ═══════════════════════════════════════════════════════════════
const PHOTOS = {
  hero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
  pharmacy: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=250&fit=crop",
  doctor: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=250&fit=crop",
  pills: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=250&fit=crop",
  stethoscope: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
  lab: "https://images.unsplash.com/photo-1582719471384-894fbb16f461?w=400&h=250&fit=crop",
  hospital: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop",
  calendar: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=250&fit=crop",
  emergency: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?w=400&h=250&fit=crop",
  health: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
  profile: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
  scan: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=250&fit=crop",
};

// ═══════════════════════════════════════════════════════════════
// 💊 DATABASES
// ═══════════════════════════════════════════════════════════════
const CPAM_RATES = [
  {name:"Doliprane 1000mg",prix:2.18,taux:65,categorie:"Antalgique"},
  {name:"Doliprane 500mg",prix:1.92,taux:65,categorie:"Antalgique"},
  {name:"Spasfon",prix:2.65,taux:65,categorie:"Antispasmodique"},
  {name:"Smecta",prix:3.60,taux:65,categorie:"Anti-diarrhéique"},
  {name:"Ventoline",prix:3.95,taux:65,categorie:"Bronchodilatateur"},
  {name:"Amoxicilline",prix:3.26,taux:65,categorie:"Antibiotique"},
  {name:"Ibuprofène 400mg",prix:1.88,taux:65,categorie:"Anti-inflammatoire"},
  {name:"Oméprazole",prix:2.52,taux:65,categorie:"Anti-acide"},
  {name:"Gaviscon",prix:4.42,taux:35,categorie:"Anti-reflux"},
  {name:"Cétirizine",prix:1.74,taux:30,categorie:"Antihistaminique"},
  {name:"Mélatonine",prix:6.90,taux:0,categorie:"Complément"},
  {name:"Homéopathie",prix:2.50,taux:0,categorie:"Homéopathie"},
  {name:"Insulin Lantus",prix:42.69,taux:100,categorie:"Antidiabétique"},
  {name:"Lévothyrox",prix:2.41,taux:65,categorie:"Thyroïde"},
];

const KNOWN_INTERACTIONS = [
  {drugs:["paracétamol","alcool"],level:"danger",fr:"Risque hépatique grave — toxicité hépatique accrue",en:"Severe liver risk — increased hepatotoxicity"},
  {drugs:["ibuprofène","aspirine"],level:"warning",fr:"Diminution de l'effet cardioprotecteur de l'aspirine",en:"Reduced cardioprotective effect of aspirin"},
  {drugs:["warfarine","aspirine"],level:"danger",fr:"Risque hémorragique majeur — surveillance INR",en:"Major bleeding risk — monitor INR"},
  {drugs:["oméprazole","clopidogrel"],level:"danger",fr:"Réduction de 40% de l'efficacité du clopidogrel",en:"40% reduction in clopidogrel efficacy"},
  {drugs:["metformine","ibuprofène"],level:"warning",fr:"Risque d'insuffisance rénale aiguë",en:"Acute kidney failure risk"},
  {drugs:["paracétamol","ibuprofène"],level:"ok",fr:"Association possible en alternance (4h d'intervalle)",en:"Can alternate safely (4h apart)"},
  {drugs:["lithium","ibuprofène"],level:"danger",fr:"Augmentation toxicité lithium — dosage sanguin requis",en:"Increased lithium toxicity — blood monitoring required"},
  {drugs:["metformine","alcool"],level:"danger",fr:"Risque d'acidose lactique potentiellement mortelle",en:"Risk of potentially fatal lactic acidosis"},
  {drugs:["warfarine","ibuprofène"],level:"danger",fr:"Risque hémorragique digestif majeur",en:"Major gastrointestinal bleeding risk"},
  {drugs:["amoxicilline","méthotrexate"],level:"danger",fr:"Augmentation toxicité du méthotrexate",en:"Increased methotrexate toxicity"},
  {drugs:["oméprazole","fer"],level:"warning",fr:"Diminution absorption du fer — espacer les prises",en:"Reduced iron absorption — space doses apart"},
  {drugs:["cétirizine","alcool"],level:"warning",fr:"Somnolence accrue — ne pas conduire",en:"Increased drowsiness — do not drive"},
];

// ═══════════════════════════════════════════════════════════════
// 🌍 TRANSLATIONS
// ═══════════════════════════════════════════════════════════════
const LANGS=[{code:"fr",label:"Français",flag:"🇫🇷"},{code:"en",label:"English",flag:"🇬🇧"},{code:"ar",label:"العربية",flag:"🇸🇦"},{code:"es",label:"Español",flag:"🇪🇸"}];
const T = {
  fr:{
    aiTitle:"Assistant IA Médical",aiSub:"Analyse intelligente de vos symptômes",
    aiPlaceholder:"Décrivez vos symptômes en détail...",aiSend:"Envoyer",aiThinking:"Analyse en cours...",
    aiWelcome:"Bonjour ! Je suis **SoigneMoi**, votre assistant santé propulsé par l'IA. 🩺\n\nJe peux :\n• Analyser vos symptômes avec un raisonnement médical structuré\n• Suivre l'évolution de vos symptômes\n• Vérifier les interactions entre vos médicaments\n• Vous orienter vers le bon spécialiste\n\nDécrivez ce que vous ressentez.\n\n⚠️ Je ne remplace pas un médecin.",
    aiClear:"Nouveau chat",aiContext:"Dossier médical actif",
    scan:"Scanner",search:"Rechercher un médicament...",searchOnline:"Rechercher",
    loadingBDPM:"Base BDPM...",loadingFDA:"Base FDA...",foundResults:"résultat(s)",noAPIResults:"Aucun résultat.",
    tabs:["Indications","Posologie","Contre-ind.","Effets","Conservation"],
    manualPlaceholder:"Code CIS...",lookupBarcode:"OK",
    disclaimer:"SoigneMoi est informatif. Il ne remplace pas un avis médical. Urgence : appelez le 15.",
    login:"Connexion",signup:"Inscription",logout:"Déconnexion",email:"Email",password:"Mot de passe",name:"Nom",
    profile:"Profil",hello:"Bonjour",
    cpamTitle:"Remboursement CPAM",cpamSub:"Estimez votre reste à charge",cpamSearch:"Nom du médicament...",
    cpamRate:"Taux",cpamRefund:"Remboursé",cpamRemain:"Reste à charge",cpamMutuelle:"Avec mutuelle (est.)",
    cpamNoResult:"Non trouvé",cpamInfo:"100% vital · 65% majeur · 30% modéré · 0% non remboursé",
    cpamDisclaimer:"Estimation indicative.",
    calTitle:"Mes rendez-vous",calAdd:"Ajouter",calNote:"Notes",calDoctor:"Médecin / Lieu",
    calTypes:["Consultation","Vaccin","Examen","Spécialiste","Dentiste","Ophtalmo","Autre"],
    calNoEvents:"Aucun rendez-vous",calUpcoming:"À venir",
    nearby:"Proximité",interactions:"Interactions",reminders:"Rappels",
    interactionsTitle:"Interactions médicamenteuses",addMed:"Ajouter un médicament...",
    checkInteractions:"Vérifier",checkWithAI:"Analyse IA",
    noInteraction:"Aucune interaction",dangerInteraction:"Danger",warningInteraction:"Précaution",
    remindersTitle:"Rappels de prise",addReminder:"Ajouter",reminderName:"Médicament",
    daily:"1x/jour",twiceDaily:"2x/jour",threeDaily:"3x/jour",weekly:"Hebdo",noReminders:"Aucun rappel",
    findPharmacy:"Pharmacie de garde",findER:"Urgences",openMaps:"Ouvrir",
    noLocation:"Activez la géolocalisation",locating:"Localisation...",nearbyTitle:"Services à proximité",
    shareCopy:"Copier",copied:"Copié !",shareText:"Notice de {name} via SoigneMoi :",
    dossierTitle:"Dossier santé",dossierAllergies:"Allergies",dossierMeds:"Traitements en cours",
    dossierConditions:"Antécédents",dossierAdd:"Ajouter",dossierEmpty:"Aucune donnée",dossierPlaceholder:"Saisir...",
    ordonnanceTitle:"Ordonnances",ordonnanceAdd:"Nouvelle ordonnance",ordonnanceDoctor:"Prescripteur",
    ordonnanceMeds:"Médicaments prescrits",ordonnanceEmpty:"Aucune ordonnance",
    apiKeyLabel:"Clé API Claude",apiKeyPlaceholder:"sk-ant-api03-...",apiKeyInfo:"Stockée localement",apiKeySet:"Clé configurée ✓",
    rateTitle:"Avis patients",ratePlaceholder:"Votre expérience...",rateSubmit:"Publier",rateEmpty:"Soyez le premier !",rateCount:"avis",
    heroTitle:"Votre santé,\nnotre priorité.",heroSub:"Propulsé par l'intelligence artificielle",
    // TTS & Voice
    ttsPlay:"Lire à voix haute",ttsStop:"Arrêter la lecture",ttsReading:"Lecture en cours...",
    voiceListening:"🎤 Je vous écoute... Décrivez vos symptômes",voiceReady:"Appuyez pour parler",
    voiceSend:"Envoyer le message vocal",voiceCancel:"Annuler",voiceHint:"Maintenez pour parler",
    accessLabel:"Accessibilité",accessTTS:"Lecture vocale auto",accessLargeText:"Grands caractères",
    accessOn:"Activé",accessOff:"Désactivé",
  },
  en:{
    aiTitle:"Medical AI Assistant",aiSub:"Intelligent symptom analysis",
    aiPlaceholder:"Describe your symptoms in detail...",aiSend:"Send",aiThinking:"Analyzing...",
    aiWelcome:"Hello! I'm **SoigneMoi**, your AI-powered health assistant. 🩺\n\nI can:\n• Analyze symptoms with structured medical reasoning\n• Track symptom evolution\n• Check drug interactions\n• Guide you to the right specialist\n\nDescribe what you feel.\n\n⚠️ I don't replace a doctor.",
    aiClear:"New chat",aiContext:"Health record active",
    scan:"Scan",search:"Search medication...",searchOnline:"Search",
    loadingBDPM:"BDPM DB...",loadingFDA:"FDA DB...",foundResults:"result(s)",noAPIResults:"No results.",
    tabs:["Indications","Dosage","Contra.","Effects","Storage"],
    manualPlaceholder:"CIS code...",lookupBarcode:"OK",
    disclaimer:"SoigneMoi is informational. Not a substitute for medical advice. Emergency: call 911.",
    login:"Log in",signup:"Sign up",logout:"Log out",email:"Email",password:"Password",name:"Name",
    profile:"Profile",hello:"Hello",
    cpamTitle:"CPAM Reimbursement",cpamSub:"Estimate your costs",cpamSearch:"Medication name...",
    cpamRate:"Rate",cpamRefund:"Covered",cpamRemain:"Out of pocket",cpamMutuelle:"With insurance (est.)",
    cpamNoResult:"Not found",cpamInfo:"100% vital · 65% major · 30% moderate · 0% not covered",
    cpamDisclaimer:"Indicative estimate.",
    calTitle:"My appointments",calAdd:"Add",calNote:"Notes",calDoctor:"Doctor / Location",
    calTypes:["Consultation","Vaccine","Exam","Specialist","Dentist","Eye doctor","Other"],
    calNoEvents:"No appointments",calUpcoming:"Upcoming",
    nearby:"Nearby",interactions:"Interactions",reminders:"Reminders",
    interactionsTitle:"Drug interactions",addMed:"Add medication...",
    checkInteractions:"Check",checkWithAI:"AI Analysis",
    noInteraction:"No interactions",dangerInteraction:"Danger",warningInteraction:"Caution",
    remindersTitle:"Medication reminders",addReminder:"Add",reminderName:"Medication",
    daily:"Daily",twiceDaily:"2x/day",threeDaily:"3x/day",weekly:"Weekly",noReminders:"No reminders",
    findPharmacy:"Find pharmacy",findER:"Nearest ER",openMaps:"Open",
    noLocation:"Enable location",locating:"Locating...",nearbyTitle:"Nearby services",
    shareCopy:"Copy",copied:"Copied!",shareText:"Info for {name} via SoigneMoi:",
    dossierTitle:"Health record",dossierAllergies:"Allergies",dossierMeds:"Current medications",
    dossierConditions:"Medical history",dossierAdd:"Add",dossierEmpty:"No data",dossierPlaceholder:"Enter...",
    ordonnanceTitle:"Prescriptions",ordonnanceAdd:"New prescription",ordonnanceDoctor:"Prescriber",
    ordonnanceMeds:"Prescribed medications",ordonnanceEmpty:"No prescriptions",
    apiKeyLabel:"Claude API Key",apiKeyPlaceholder:"sk-ant-api03-...",apiKeyInfo:"Stored locally",apiKeySet:"Key set ✓",
    rateTitle:"Patient reviews",ratePlaceholder:"Your experience...",rateSubmit:"Post",rateEmpty:"Be the first!",rateCount:"reviews",
    heroTitle:"Your health,\nour priority.",heroSub:"Powered by artificial intelligence",
    // TTS & Voice
    ttsPlay:"Read aloud",ttsStop:"Stop reading",ttsReading:"Reading...",
    voiceListening:"🎤 Listening... Describe your symptoms",voiceReady:"Tap to speak",
    voiceSend:"Send voice message",voiceCancel:"Cancel",voiceHint:"Hold to speak",
    accessLabel:"Accessibility",accessTTS:"Auto voice reading",accessLargeText:"Large text",
    accessOn:"On",accessOff:"Off",
  },
};
["ar","es"].forEach(l=>{T[l]={...T.fr}});
const TAB_KEYS=["indication","posologie","contreIndications","effetsSecondaires","conservation"];

// ═══════════════════════════════════════════════════════════════
// 🪝 HOOKS
// ═══════════════════════════════════════════════════════════════
function useTheme(){const[dark,setDark]=useState(true);return{dark,toggle:()=>setDark(d=>!d),c:dark?DK:LT};}

function useApiKey(){
  const[key,setKey]=useState("");
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("sm-api-key");if(r?.value)setKey(r.value)}catch(e){}})()},[]);
  const save=async k=>{setKey(k);try{await window.storage.set("sm-api-key",k)}catch(e){}};
  return{key,save,hasKey:!!key};
}

function useAIChat(lang,dossier){
  const[msgs,setMsgs]=useState([]);const[loading,setLoading]=useState(false);const[symptoms,setSymptoms]=useState([]);
  const buildSys=useCallback(()=>{
    const fr=lang!=="en";
    const dos=(dossier.allergies.length||dossier.meds.length||dossier.conditions.length)?
      `\n\nDOSSIER PATIENT:${dossier.allergies.length?`\n- Allergies: ${dossier.allergies.join(", ")}`:""}${dossier.meds.length?`\n- Traitements: ${dossier.meds.join(", ")}`:""}${dossier.conditions.length?`\n- Antécédents: ${dossier.conditions.join(", ")}`:""}`:
      "";
    const hist=symptoms.length?`\n\nSYMPTÔMES SESSION:\n${symptoms.map((s,i)=>`${i+1}. ${s}`).join("\n")}`:"";
    return fr?
      `Tu es SoigneMoi, assistant santé IA avancé et bienveillant. Réponds en français.\n\nPROTOCOLE:\n1. TRIAGE: urgence (bénin/modéré/sévère/urgence)\n2. DIAGNOSTIC DIFFÉRENTIEL: 2-4 causes possibles\n3. SIGNAUX D'ALERTE: signes d'urgence\n4. CONSEILS: mesures spécifiques\n5. MÉDICAMENTS OTC: nom, posologie, durée max\n6. ORIENTATION: quel spécialiste, quand consulter\n7. SUIVI: questions ciblées\n\nRÈGLES: Toujours recommander un médecin. Signaler urgences 🚨. Considérer interactions. Ne jamais diagnostiquer.\n\nFORMAT:\n🔍 Évaluation\n📊 Gravité\n🩺 Causes possibles\n✅ Actions\n💊 Médicaments\n🚨 Urgence si...\n❓ Questions${dos}${hist}`:
      `You are SoigneMoi, an advanced empathetic medical AI. Respond in English.\n\nPROTOCOL:\n1. TRIAGE: urgency level\n2. DIFFERENTIAL: 2-4 possible causes\n3. RED FLAGS: emergency signs\n4. ADVICE: specific actions\n5. OTC MEDS: name, dosage, max duration\n6. REFERRAL: which specialist, when\n7. FOLLOW-UP: targeted questions\n\nRULES: Always recommend seeing a doctor. Flag emergencies 🚨. Consider interactions. Never diagnose.\n\nFORMAT:\n🔍 Assessment\n📊 Severity\n🩺 Possible Causes\n✅ Actions\n💊 Medications\n🚨 Emergency if...\n❓ Questions${dos}${hist}`;
  },[lang,dossier,symptoms]);
  const send=useCallback(async text=>{
    if(!text.trim()||loading)return;
    const um={role:"user",content:text,ts:Date.now()};
    setMsgs(p=>[...p,um]);setSymptoms(p=>[...p,text.substring(0,100)]);setLoading(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,system:buildSys(),
          messages:[...msgs,um].slice(-12).map(m=>({role:m.role,content:m.content}))})});
      const d=await r.json();
      setMsgs(p=>[...p,{role:"assistant",content:d.content?.map(i=>i.text||"").join("\n")||"Erreur.",ts:Date.now()}]);
    }catch(e){
      setMsgs(p=>[...p,{role:"assistant",content:lang==="en"?
        "🩺 AI unavailable.\n\n✅ General:\n- Rest & hydration\n- Paracetamol for pain (max 3g/day)\n\n🚨 Call 911 if severe pain, breathing difficulty, high fever.\n\n⚠️ See a healthcare professional.":
        "🩺 IA indisponible.\n\n✅ Général:\n- Repos et hydratation\n- Paracétamol si douleur (max 3g/jour)\n\n🚨 Appelez le 15 si douleur intense, difficulté respiratoire, forte fièvre.\n\n⚠️ Consultez un professionnel.",ts:Date.now()}]);
    }setLoading(false);
  },[msgs,loading,buildSys,lang]);
  return{msgs,loading,send,clear:useCallback(()=>{setMsgs([]);setSymptoms([])},[])};
}

// --- TTS (Text-to-Speech) — Lecture vocale haute voix ---
function useTTS(lang) {
  const [speaking, setSpeaking] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const utterRef = useRef(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  const cleanText = useCallback((text) => {
    // Remove markdown, emojis, special chars for natural reading
    return text
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/[🩺📊✅💊🚨❓🔍•·]/g, "")
      .replace(/#{1,3}\s/g, "")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, ". ")
      .replace(/\s{2,}/g, " ")
      .trim();
  }, []);

  const speak = useCallback((text) => {
    if (!supported || !text) return;
    window.speechSynthesis.cancel();
    const cleaned = cleanText(text);
    if (!cleaned) return;

    // Split long text into chunks (max ~200 chars per utterance for reliability)
    const sentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
    const chunks = [];
    let current = "";
    sentences.forEach(s => {
      if ((current + s).length > 200) {
        if (current) chunks.push(current.trim());
        current = s;
      } else {
        current += s;
      }
    });
    if (current) chunks.push(current.trim());

    setSpeaking(true);
    let idx = 0;

    const speakNext = () => {
      if (idx >= chunks.length) { setSpeaking(false); return; }
      const u = new SpeechSynthesisUtterance(chunks[idx]);
      u.lang = { fr: "fr-FR", en: "en-US", ar: "ar-SA", es: "es-ES" }[lang] || "fr-FR";
      u.rate = 0.92;
      u.pitch = 1.0;
      u.volume = 1.0;

      // Try to find a good voice for the language
      const voices = window.speechSynthesis.getVoices();
      const langCode = u.lang.substring(0, 2);
      const preferred = voices.find(v => v.lang.startsWith(langCode) && v.localService) ||
                        voices.find(v => v.lang.startsWith(langCode));
      if (preferred) u.voice = preferred;

      u.onend = () => { idx++; speakNext(); };
      u.onerror = () => { setSpeaking(false); };
      utterRef.current = u;
      window.speechSynthesis.speak(u);
    };

    speakNext();
  }, [supported, lang, cleanText]);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  // Preload voices
  useEffect(() => {
    if (supported) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    return () => { if (supported) window.speechSynthesis.cancel(); };
  }, [supported]);

  // Load autoRead preference
  useEffect(() => {
    (async () => { try { const r = await window.storage.get("sm-auto-tts"); if (r?.value === "true") setAutoRead(true); } catch (e) {} })();
  }, []);

  const toggleAutoRead = useCallback(async () => {
    const next = !autoRead;
    setAutoRead(next);
    try { await window.storage.set("sm-auto-tts", String(next)); } catch (e) {}
  }, [autoRead]);

  return { speaking, speak, stop, supported, autoRead, toggleAutoRead };
}

// --- Voice Recognition — Robust, continuous, auto-restart, permission-aware ---
function useVoice(lang) {
  const [on, setOn] = useState(false);
  const [txt, setTxt] = useState("");
  const [ok, setOk] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState("");
  const refRecog = useRef(null);
  const refFinal = useRef(""); // use ref to avoid stale closure
  const refShouldListen = useRef(false); // tracks if we WANT to be listening
  const restartTimerRef = useRef(null);

  // Create recognizer once, not on every render
  const createRecognizer = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setOk(false); return null; }

    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.lang = { fr: "fr-FR", en: "en-US", ar: "ar-SA", es: "es-ES" }[lang] || "fr-FR";

    r.onresult = (e) => {
      let interim = "";
      let finalChunk = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalChunk += transcript;
          setConfidence(Math.round(e.results[i][0].confidence * 100));
        } else {
          interim += transcript;
        }
      }
      if (finalChunk) {
        refFinal.current = (refFinal.current ? refFinal.current + " " : "") + finalChunk;
        setTxt(refFinal.current);
      }
      if (interim) {
        // Show final + current interim
        setTxt(refFinal.current ? refFinal.current + " " + interim : interim);
      }
    };

    r.onend = () => {
      // Auto-restart if we still want to be listening
      // (browsers stop after silence, errors, or max duration)
      if (refShouldListen.current) {
        restartTimerRef.current = setTimeout(() => {
          if (refShouldListen.current && refRecog.current) {
            try { refRecog.current.start(); } catch (e) {
              // Already started or other error — recreate
              const newR = createRecognizer();
              if (newR) { refRecog.current = newR; try { newR.start(); } catch (e2) {} }
            }
          }
        }, 100);
      } else {
        setOn(false);
      }
    };

    r.onerror = (e) => {
      const errType = e.error;
      if (errType === "not-allowed" || errType === "service-not-allowed") {
        setError(lang === "en" ? "Microphone access denied. Check browser permissions." : "Accès micro refusé. Vérifiez les permissions du navigateur.");
        setOk(false);
        refShouldListen.current = false;
        setOn(false);
      } else if (errType === "no-speech") {
        // Silence detected — don't stop, will auto-restart via onend
      } else if (errType === "aborted") {
        // User or system aborted — stop
        if (!refShouldListen.current) setOn(false);
      } else if (errType === "network") {
        setError(lang === "en" ? "Network error. Check connection." : "Erreur réseau. Vérifiez la connexion.");
        // Will try to restart via onend
      }
    };

    return r;
  }, [lang]);

  // Request microphone permission explicitly (needed on mobile)
  const requestPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Permission granted — release the stream immediately
      stream.getTracks().forEach(t => t.stop());
      return true;
    } catch (e) {
      setError(lang === "en" ? "Microphone access denied." : "Accès au microphone refusé.");
      setOk(false);
      return false;
    }
  }, [lang]);

  const start = useCallback(async () => {
    setError("");
    // Step 1: request permission first (critical on mobile/Safari)
    const allowed = await requestPermission();
    if (!allowed) return;

    // Step 2: create fresh recognizer
    const r = createRecognizer();
    if (!r) return;

    // Step 3: reset state
    refFinal.current = "";
    setTxt("");
    setConfidence(0);
    setOn(true);
    refShouldListen.current = true;
    refRecog.current = r;

    // Step 4: start listening
    try {
      r.start();
    } catch (e) {
      setError(lang === "en" ? "Could not start microphone." : "Impossible de démarrer le micro.");
      setOn(false);
      refShouldListen.current = false;
    }
  }, [createRecognizer, requestPermission, lang]);

  const stop = useCallback(() => {
    refShouldListen.current = false;
    if (restartTimerRef.current) { clearTimeout(restartTimerRef.current); restartTimerRef.current = null; }
    if (refRecog.current) {
      try { refRecog.current.stop(); } catch (e) {}
    }
    setOn(false);
  }, []);

  const reset = useCallback(() => {
    refFinal.current = "";
    setTxt("");
    setConfidence(0);
    setError("");
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      refShouldListen.current = false;
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (refRecog.current) { try { refRecog.current.stop(); } catch (e) {} }
    };
  }, []);

  return { on, txt, ok, confidence, error, start, stop, reset };
}

function useCam(){
  const vRef=useRef(null),sRef=useRef(null),scRef=useRef(false);const[active,setActive]=useState(false);const[code,setCode]=useState(null);
  const start=useCallback(async()=>{setCode(null);try{const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280}}});sRef.current=s;if(vRef.current){vRef.current.srcObject=s;await vRef.current.play()}setActive(true);scRef.current=true;
    if("BarcodeDetector"in window){const d=new window.BarcodeDetector({formats:["ean_13","ean_8","upc_a","code_128","qr_code"]});const loop=async()=>{if(!scRef.current||!vRef.current)return;try{const b=await d.detect(vRef.current);if(b.length>0){setCode(b[0].rawValue);scRef.current=false;return}}catch(e){}if(scRef.current)requestAnimationFrame(loop)};requestAnimationFrame(loop)}}catch(e){setActive(false)}},[]);
  const stop=useCallback(()=>{scRef.current=false;if(sRef.current){sRef.current.getTracks().forEach(t=>t.stop());sRef.current=null}if(vRef.current)vRef.current.srcObject=null;setActive(false)},[]);
  return{vRef,active,code,start,stop,setCode};
}

function useSearch(){
  const[results,setResults]=useState([]);const[loading,setLoading]=useState(false);const[searched,setSearched]=useState(false);const[progress,setProgress]=useState("");

  // Helper: try fetch with timeout
  const safeFetch=async(url,timeout=6000)=>{
    const ctrl=new AbortController();
    const timer=setTimeout(()=>ctrl.abort(),timeout);
    try{const r=await fetch(url,{signal:ctrl.signal});clearTimeout(timer);return r}
    catch(e){clearTimeout(timer);return null}
  };

  const search=useCallback(async(q,t,isBar=false)=>{
    if(!q||q.length<2)return;
    setLoading(true);setSearched(true);setResults([]);
    const all=[];
    const isNumeric=/^\d+$/.test(q.trim());
    const code=q.trim();

    // ═══════════════════════════════════════════════════════════
    // SOURCE 1: Open Food Facts — best for EAN-13 barcodes
    // Covers medicines, parapharmacy, supplements sold in pharmacies
    // ═══════════════════════════════════════════════════════════
    if(isBar||isNumeric){
      setProgress("Open Food Facts...");
      try{
        const r=await safeFetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json`);
        if(r&&r.ok){
          const d=await r.json();
          if(d.status===1&&d.product){
            const p=d.product;
            all.push({
              id:`off-${code}`,name:p.product_name||p.product_name_fr||code,
              category:p.categories||p.categories_tags?.join(", ")||"",
              lab:p.brands||p.manufacturer||"",barcode:code,source:"OpenFoodFacts",
              indication:p.generic_name||p.product_name||"",
              posologie:p.quantity?`Contenu: ${p.quantity}`:"",
              contreIndications:p.allergens?`Allergènes: ${p.allergens}`:(p.allergens_tags?.length?`Allergènes: ${p.allergens_tags.join(", ")}`:""),
              effetsSecondaires:p.ingredients_text||"",
              conservation:p.stores?`Disponible: ${p.stores}`:"",
              image:p.image_front_small_url||"📦",_photo:p.image_front_url||null,
            });
          }
        }
      }catch(e){}
    }

    // ═══════════════════════════════════════════════════════════
    // SOURCE 2: Open Medications / OpenMedic FR — EAN/CIP codes
    // ═══════════════════════════════════════════════════════════
    if(isBar||isNumeric){
      setProgress("OpenMedic...");
      try{
        // Try CIP13 (13 digits) or CIP7 (7 digits) lookup
        const r=await safeFetch(`https://medicaments-api.giygas.dev/v1/medicaments?cip=${code}`);
        if(r&&r.ok){
          const d=await r.json();
          const items=Array.isArray(d)?d:(d.data||d.results||[]);
          items.slice(0,4).forEach((m,i)=>{
            const sub=(m.compositions||[]).map(c=>c.denomination_substance||"").filter(Boolean);
            if(!all.find(a=>a.name===m.denomination))
              all.push({id:`cip-${m.CIS||i}`,name:m.denomination||code,category:m.forme_pharmaceutique||"",
                lab:m.titulaire||"",barcode:m.CIS||code,source:"BDPM-CIP",
                indication:`${m.denomination||code}${m.forme_pharmaceutique?" — "+m.forme_pharmaceutique:""}`,
                posologie:sub.length?"Substances: "+sub.join(", "):"",
                contreIndications:m.statut_bdm?"Statut: "+m.statut_bdm:"",
                effetsSecondaires:m.titulaire?"Titulaire: "+m.titulaire:"",
                conservation:(m.presentations||[]).map(p=>`${p.libelle||""}${p.prix?" — "+p.prix+"€":""}`).join("\n"),
                _substances:sub});
          });
        }
      }catch(e){}
    }

    // ═══════════════════════════════════════════════════════════
    // SOURCE 3: BDPM (Base de Données Publique des Médicaments)
    // Search by CIS code or name
    // ═══════════════════════════════════════════════════════════
    setProgress(t.loadingBDPM);
    try{
      // For barcodes: try direct CIS lookup AND search
      const urls=[];
      if(isNumeric){
        urls.push(`https://medicaments-api.giygas.dev/v1/medicaments/${code}`);
        urls.push(`https://medicaments-api.giygas.dev/v1/medicaments?search=${code}`);
      }else{
        urls.push(`https://medicaments-api.giygas.dev/v1/medicaments?search=${encodeURIComponent(q)}`);
      }

      for(const url of urls){
        try{
          const r=await safeFetch(url);
          if(r&&r.ok){
            const d=await r.json();
            const items=Array.isArray(d)?d:(d.data||d.results||(d.denomination?[d]:[]));
            items.slice(0,6).forEach((m,i)=>{
              const sub=(m.compositions||[]).map(c=>c.denomination_substance||"").filter(Boolean);
              const name=m.denomination||q;
              if(!all.find(a=>a.name===name&&a.source.startsWith("BDPM")))
                all.push({id:`b-${m.CIS||i}`,name,category:m.forme_pharmaceutique||"",
                  lab:m.titulaire||"",barcode:m.CIS||"",source:"BDPM",
                  indication:`${name}${m.forme_pharmaceutique?" — "+m.forme_pharmaceutique:""}`,
                  posologie:sub.length?"Substances: "+sub.join(", "):"",
                  contreIndications:m.statut_bdm?"Statut: "+m.statut_bdm:"",
                  effetsSecondaires:m.titulaire?"Titulaire: "+m.titulaire:"",
                  conservation:(m.presentations||[]).map(p=>`${p.libelle||""}${p.prix?" — "+p.prix+"€":""}`).join("\n"),
                  _substances:sub});
            });
          }
        }catch(e){}
        if(all.length>0&&isNumeric)break; // Stop if found for barcode
      }
    }catch(e){}

    // ═══════════════════════════════════════════════════════════
    // SOURCE 4: Open Beauty Facts — cosmetics & parapharmacy
    // ═══════════════════════════════════════════════════════════
    if((isBar||isNumeric)&&all.length===0){
      setProgress("Parapharmacie...");
      try{
        const r=await safeFetch(`https://world.openbeautyfacts.org/api/v2/product/${code}.json`);
        if(r&&r.ok){
          const d=await r.json();
          if(d.status===1&&d.product){
            const p=d.product;
            all.push({
              id:`obf-${code}`,name:p.product_name||p.product_name_fr||code,
              category:p.categories||"Parapharmacie",lab:p.brands||"",barcode:code,source:"Parapharmacie",
              indication:p.generic_name||p.product_name||"",posologie:p.quantity||"",
              contreIndications:p.allergens||"",effetsSecondaires:p.ingredients_text||"",
              conservation:p.stores||"",image:p.image_front_small_url||"🧴",_photo:p.image_front_url||null,
            });
          }
        }
      }catch(e){}
    }

    // ═══════════════════════════════════════════════════════════
    // SOURCE 5: FDA (US drugs) — fallback for international products
    // ═══════════════════════════════════════════════════════════
    if(!isNumeric||all.length===0){
      setProgress(t.loadingFDA);
      try{
        // Search by UPC barcode OR brand name
        const searchField=isNumeric?`openfda.upc:"${code}"`:`openfda.brand_name:"${encodeURIComponent(q)}"`;
        const r=await safeFetch(`https://api.fda.gov/drug/label.json?search=${searchField}&limit=3`);
        if(r&&r.ok){
          const d=await r.json();
          (d.results||[]).forEach((m,i)=>{
            all.push({id:`f-${i}`,name:m.openfda?.brand_name?.[0]||q,
              category:m.openfda?.pharm_class_epc?.[0]||"",lab:m.openfda?.manufacturer_name?.[0]||"",
              barcode:m.openfda?.upc?.[0]||"",source:"FDA",
              indication:(m.indications_and_usage||["—"])[0]?.substring(0,500),
              posologie:(m.dosage_and_administration||["—"])[0]?.substring(0,500),
              contreIndications:(m.contraindications||["—"])[0]?.substring(0,500),
              effetsSecondaires:(m.adverse_reactions||["—"])[0]?.substring(0,500),
              conservation:(m.storage_and_handling||["—"])[0]?.substring(0,500)});
          });
        }
        // If barcode not found by UPC, try by package NDC
        if(isNumeric&&all.length===0){
          const r2=await safeFetch(`https://api.fda.gov/drug/label.json?search=openfda.package_ndc:"${code}"&limit=2`);
          if(r2&&r2.ok){
            const d2=await r2.json();
            (d2.results||[]).forEach((m,i)=>{
              all.push({id:`fn-${i}`,name:m.openfda?.brand_name?.[0]||code,
                category:m.openfda?.pharm_class_epc?.[0]||"",lab:m.openfda?.manufacturer_name?.[0]||"",
                source:"FDA-NDC",
                indication:(m.indications_and_usage||["—"])[0]?.substring(0,500),
                posologie:(m.dosage_and_administration||["—"])[0]?.substring(0,500),
                contreIndications:(m.contraindications||["—"])[0]?.substring(0,500),
                effetsSecondaires:(m.adverse_reactions||["—"])[0]?.substring(0,500),
                conservation:(m.storage_and_handling||["—"])[0]?.substring(0,500)});
            });
          }
        }
      }catch(e){}
    }

    // ═══════════════════════════════════════════════════════════
    // SOURCE 6: DailyMed (NIH) — last resort for US drugs
    // ═══════════════════════════════════════════════════════════
    if(!isNumeric&&all.length===0){
      setProgress("DailyMed...");
      try{
        const r=await safeFetch(`https://dailymed.nlm.nih.gov/dailymed/services/v2/spls.json?drug_name=${encodeURIComponent(q)}&pagesize=3`);
        if(r&&r.ok){
          const d=await r.json();
          (d.data||[]).forEach((m,i)=>{
            all.push({id:`dm-${i}`,name:m.title||q,category:"",lab:m.labeler||"",source:"DailyMed",
              indication:m.title||"",posologie:"",contreIndications:"",effetsSecondaires:"",conservation:""});
          });
        }
      }catch(e){}
    }

    setResults(all);setLoading(false);setProgress("");
  },[]);

  return{results,loading,searched,search,clear:useCallback(()=>{setResults([]);setSearched(false)},[]),progress};
}

function useAuth(){
  const[user,setUser]=useState(null);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("sm4-session");if(r?.value)setUser(JSON.parse(r.value))}catch(e){}})()},[]);
  const save=async u=>{try{await window.storage.set("sm4-session",JSON.stringify(u))}catch(e){}};
  return{user,
    signup:async(e,p,n)=>{const u={id:"u_"+Date.now(),email:e,name:n,createdAt:new Date().toISOString()};setUser(u);await save(u);try{await window.storage.set(`sm4-u-${e}`,JSON.stringify({...u,password:p}))}catch(e){}return{ok:true}},
    login:async(e,p)=>{try{const r=await window.storage.get(`sm4-u-${e}`);if(r?.value){const s=JSON.parse(r.value);if(s.password===p){const u={...s};delete u.password;setUser(u);await save(u);return{ok:true}}}}catch(e){}return{ok:false}},
    logout:async()=>{setUser(null);try{await window.storage.delete("sm4-session")}catch(e){}}};
}

function useGeo(){
  const[loc,setLoc]=useState(null);const[loading,setLoading]=useState(false);
  const locate=useCallback(()=>{if(!navigator.geolocation)return;setLoading(true);navigator.geolocation.getCurrentPosition(p=>{setLoc({lat:p.coords.latitude,lng:p.coords.longitude});setLoading(false)},()=>setLoading(false),{enableHighAccuracy:true,timeout:10000})},[]);
  const openMaps=useCallback(q=>{if(!loc)return;window.open(`https://www.google.com/maps/search/${encodeURIComponent(q)}/@${loc.lat},${loc.lng},14z`,"_blank")},[loc]);
  return{loc,loading,locate,openMaps};
}

function useDossier(){
  const[data,setData]=useState({allergies:[],meds:[],conditions:[]});
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("sm-dossier");if(r?.value)setData(JSON.parse(r.value))}catch(e){}})()},[]);
  const save=async d=>{setData(d);try{await window.storage.set("sm-dossier",JSON.stringify(d))}catch(e){}};
  const addItem=(cat,item)=>{if(!item.trim())return;save({...data,[cat]:[...data[cat],item.trim()]})};
  const removeItem=(cat,idx)=>{save({...data,[cat]:data[cat].filter((_,i)=>i!==idx)})};
  return{...data,addItem,removeItem};
}

function useOrdonnances(){
  const[list,setList]=useState([]);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("sm-ordonnances");if(r?.value)setList(JSON.parse(r.value))}catch(e){}})()},[]);
  const save=async l=>{setList(l);try{await window.storage.set("sm-ordonnances",JSON.stringify(l))}catch(e){}};
  return{list,add:o=>save([...list,{...o,id:Date.now()}]),remove:id=>save(list.filter(o=>o.id!==id))};
}

// ═══════════════════════════════════════════════════════════════
// 🧩 COMPONENTS
// ═══════════════════════════════════════════════════════════════
function PhotoCard({src,children,c,style,overlay=.55,onClick}){
  return(<div onClick={onClick} style={{position:"relative",borderRadius:20,overflow:"hidden",marginBottom:12,cursor:onClick?"pointer":"default",boxShadow:c.shadowMd,transition:"all .2s",...style}}>
    <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} loading="lazy"/>
    <div style={{position:"absolute",inset:0,background:`linear-gradient(180deg,transparent 20%,rgba(0,0,0,${overlay}) 100%)`}}/>
    <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"16px 18px"}}>{children}</div>
  </div>);
}

function GlowCard({children,c,style,onClick,glow=false}){
  return(<div onClick={onClick} style={{background:c.card,border:`1px solid ${c.border}`,borderRadius:18,padding:"16px 18px",marginBottom:10,
    boxShadow:glow?`${c.shadow}, ${c.glow}`:c.shadow,transition:"all .2s",cursor:onClick?"pointer":"default",
    backdropFilter:"blur(20px)",...style}}>{children}</div>);
}

function NeonPill({children,c,variant="accent",onClick,style}){
  const colors={accent:{bg:c.accentSoft,col:c.accent,bdr:c.accentBorder},danger:{bg:c.dangerSoft,col:c.danger,bdr:c.dangerBorder},
    amber:{bg:c.amberSoft,col:c.amber,bdr:c.amberBorder},blue:{bg:c.blueSoft,col:c.blue,bdr:c.blueBorder},
    green:{bg:c.greenSoft,col:c.green,bdr:c.greenBorder},purple:{bg:c.purpleSoft,col:c.purple,bdr:c.purpleBorder}};
  const v=colors[variant]||colors.accent;
  return(<span onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:5,padding:"5px 14px",background:v.bg,
    border:`1px solid ${v.bdr}`,borderRadius:24,fontSize:12,fontWeight:600,color:v.col,cursor:onClick?"pointer":"default",
    transition:"all .15s",...style}}>{children}</span>);
}

function NeonBadge({icon,c,size=44,glow=false}){
  return(<div style={{width:size,height:size,borderRadius:size*.32,background:c.accentSoft,border:`1px solid ${c.accentBorder}`,
    display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.45,flexShrink:0,
    boxShadow:glow?c.glow:"none"}}>{icon}</div>);
}

function MdText({text,c}){
  if(!text)return null;
  const parts=text.split(/(\*\*[^*]+\*\*)/g);
  return(<span>{parts.map((p,i)=>p.startsWith("**")&&p.endsWith("**")?<strong key={i} style={{color:c.neon,fontWeight:700}}>{p.slice(2,-2)}</strong>:<span key={i}>{p}</span>)}</span>);
}

// ═══════════════════════════════════════════════════════════════
// 🎯 MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function SoigneMoi(){
  const{dark,toggle,c}=useTheme();const apiK=useApiKey();
  const[lang,setLang]=useState("fr");const[screen,setScreen]=useState("home");const[product,setProduct]=useState(null);
  const[tab,setTab]=useState(0);const[search,setSearch]=useState("");const[splash,setSplash]=useState(true);
  const[showLang,setShowLang]=useState(false);const[manualCode,setManualCode]=useState("");
  const[navTab,setNavTab]=useState("ai");const[chatInput,setChatInput]=useState("");
  const[interMeds,setInterMeds]=useState([]);const[interInput,setInterInput]=useState("");
  const[interResults,setInterResults]=useState(null);const[interAI,setInterAI]=useState(null);const[interAILoading,setInterAILoading]=useState(false);
  const[reminders,setReminders]=useState([]);const[remName,setRemName]=useState("");const[remTime,setRemTime]=useState("08:00");const[remFreq,setRemFreq]=useState("daily");
  const[authMode,setAuthMode]=useState("login");const[authEmail,setAuthEmail]=useState("");const[authPass,setAuthPass]=useState("");const[authName,setAuthName]=useState("");const[authError,setAuthError]=useState("");
  const[calEvents,setCalEvents]=useState([]);const[calType,setCalType]=useState("Consultation");const[calDate,setCalDate]=useState("");const[calTime2,setCalTime2]=useState("09:00");const[calDoc,setCalDoc]=useState("");const[calNote,setCalNote]=useState("");
  const[cpamSearch,setCpamSearch]=useState("");const[cpamResult,setCpamResult]=useState(null);const[cpamSearched,setCpamSearched]=useState(false);
  const[ratings,setRatings]=useState({});const[rateInput,setRateInput]=useState("");const[rateStars,setRateStars]=useState(4);
  const[showShare,setShowShare]=useState(false);const[copied,setCopied]=useState(false);
  const[dossierInput,setDossierInput]=useState("");const[dossierCat,setDossierCat]=useState("allergies");
  const[ordDoc,setOrdDoc]=useState("");const[ordDate,setOrdDate]=useState("");const[ordMeds,setOrdMeds]=useState("");
  const[showAccess,setShowAccess]=useState(false);
  const[largeText,setLargeText]=useState(false);
  const[voiceMode,setVoiceMode]=useState(false); // full-screen voice input mode

  const t=T[lang]||T.fr;const auth=useAuth();const voice=useVoice(lang);const cam=useCam();const api=useSearch();
  const dossier=useDossier();const ordonnances=useOrdonnances();const ai=useAIChat(lang,dossier);const geo=useGeo();
  const tts=useTTS(lang);
  const chatEndRef=useRef(null);
  const fs=largeText?1.2:1; // font scale

  useEffect(()=>{chatEndRef.current?.scrollIntoView({behavior:"smooth"})},[ai.msgs]);
  // Voice → chatInput live sync
  useEffect(()=>{if(voice.txt&&!voiceMode){if(navTab==="ai")setChatInput(voice.txt);else setSearch(voice.txt)}},[voice.txt,voiceMode]);
  // Voice mode → chatInput sync
  useEffect(()=>{if(voiceMode&&voice.txt)setChatInput(voice.txt)},[voiceMode,voice.txt]);
  useEffect(()=>{setTimeout(()=>setSplash(false),1800)},[]);
  useEffect(()=>{if(cam.code){cam.stop();api.search(cam.code,t,true);setNavTab("search");setScreen("home")}},[cam.code]);
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("sm4-rem");if(r?.value)setReminders(JSON.parse(r.value));
    const cl=await window.storage.get("sm4-cal");if(cl?.value)setCalEvents(JSON.parse(cl.value));
    const rt=await window.storage.get("sm4-ratings");if(rt?.value)setRatings(JSON.parse(rt.value));
    const lt=await window.storage.get("sm-large-text");if(lt?.value==="true")setLargeText(true)}catch(e){}})()},[]);

  // Auto-read AI responses
  useEffect(()=>{
    if(tts.autoRead&&ai.msgs.length>0){
      const last=ai.msgs[ai.msgs.length-1];
      if(last.role==="assistant")tts.speak(last.content);
    }
  },[ai.msgs.length]);

  const saveRem=async r=>{setReminders(r);try{await window.storage.set("sm4-rem",JSON.stringify(r))}catch(e){}};
  const saveCal=async c=>{setCalEvents(c);try{await window.storage.set("sm4-cal",JSON.stringify(c))}catch(e){}};
  const saveRatings=async r=>{setRatings(r);try{await window.storage.set("sm4-ratings",JSON.stringify(r))}catch(e){}};
  const toggleLargeText=async()=>{const next=!largeText;setLargeText(next);try{await window.storage.set("sm-large-text",String(next))}catch(e){}};
  const open=p=>{setProduct(p);setTab(0);setScreen("detail");setShowShare(false)};

  // Voice mode: send voice input and close
  const sendVoice=()=>{
    if(chatInput.trim()){ai.send(chatInput);setChatInput("");}
    voice.stop();voice.reset();setVoiceMode(false);
  };

  const checkInter=()=>{if(interMeds.length<2){setInterResults([]);return}const found=[];
    for(let i=0;i<interMeds.length;i++){for(let j=i+1;j<interMeds.length;j++){const a=interMeds[i].toLowerCase(),b=interMeds[j].toLowerCase();
      KNOWN_INTERACTIONS.forEach(k=>{if(((k.drugs[0].includes(a)||a.includes(k.drugs[0]))&&(k.drugs[1].includes(b)||b.includes(k.drugs[1])))||
        ((k.drugs[0].includes(b)||b.includes(k.drugs[0]))&&(k.drugs[1].includes(a)||a.includes(k.drugs[1]))))found.push({...k,pair:[interMeds[i],interMeds[j]]})})}}setInterResults(found)};

  const checkInterAI=async()=>{if(interMeds.length<2)return;setInterAILoading(true);setInterAI(null);
    try{const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,
        system:lang==="en"?"You are a pharmacology expert. Analyze drug interactions precisely. For each pair: severity, mechanism, recommendation. Be concise. Use emojis.":
          "Tu es un expert en pharmacologie. Analyse les interactions médicamenteuses. Pour chaque paire: sévérité, mécanisme, recommandation. Sois concis. Utilise des emojis.",
        messages:[{role:"user",content:`${lang==="en"?"Analyze":"Analyse"}: ${interMeds.join(", ")}${dossier.allergies.length?`\nAllergies: ${dossier.allergies.join(", ")}`:""}`}]})});
      const d=await r.json();setInterAI(d.content?.map(i=>i.text||"").join("\n")||"Erreur")}catch(e){setInterAI(lang==="en"?"AI unavailable.":"IA indisponible.")}setInterAILoading(false)};

  const searchCPAM=()=>{if(!cpamSearch.trim())return;setCpamSearched(true);const q=cpamSearch.toLowerCase();
    setCpamResult(CPAM_RATES.find(m=>m.name.toLowerCase().includes(q)||q.includes(m.name.toLowerCase()))||null)};

  // ─── Styles ───
  const F="'Manrope','Sora',system-ui,sans-serif";
  const phone={fontFamily:F,width:"100%",maxWidth:420,minHeight:720,margin:"0 auto",background:c.bg,borderRadius:32,
    border:`1px solid ${c.border}`,overflow:"hidden",boxShadow:`${c.shadowLg}, ${c.glow}`,position:"relative",display:"flex",flexDirection:"column"};
  const inner={flex:1,padding:"16px 16px 96px",overflowY:"auto"};
  const btnP={width:"100%",padding:"14px",background:c.gradient,border:"none",borderRadius:16,color:"#fff",cursor:"pointer",
    fontSize:15,fontWeight:700,fontFamily:F,transition:"all .15s",boxShadow:`0 4px 20px ${c.accentGlow}`,letterSpacing:.3};
  const btnSec={...btnP,background:c.card,color:c.accent,border:`1.5px solid ${c.accentBorder}`,boxShadow:"none"};
  const inp={width:"100%",padding:"13px 16px",background:c.input,border:`1.5px solid ${c.inputBorder}`,borderRadius:14,
    color:c.text,fontSize:14,outline:"none",fontFamily:F,boxSizing:"border-box",transition:"all .15s"};
  const navBar={position:"absolute",bottom:0,left:0,right:0,display:"flex",background:`${c.card}F0`,
    borderTop:`1px solid ${c.border}`,padding:"6px 2px 10px",zIndex:10,backdropFilter:"blur(20px)"};
  const navI=a=>({flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,cursor:"pointer",
    background:"none",border:"none",padding:"4px 0",color:a?c.neon:c.ter,fontSize:9,fontWeight:a?700:500,
    fontFamily:F,transition:"color .15s",position:"relative"});

  // ═══ SPLASH ═══
  if(splash)return(
    <div style={{...phone,alignItems:"center",justifyContent:"center",background:c.bg}}>
      <div style={{textAlign:"center",animation:"smIn .7s ease-out"}}>
        <div style={{width:90,height:90,borderRadius:28,background:c.gradient,display:"inline-flex",alignItems:"center",justifyContent:"center",
          marginBottom:20,boxShadow:`0 20px 60px ${c.accentGlow}`}}>
          <span style={{fontSize:46}}>🩺</span>
        </div>
        <div style={{fontSize:30,fontWeight:800,color:c.text,letterSpacing:-.5}}>Soigne<span style={{color:c.neon}}>Moi</span></div>
        <div style={{color:c.sec,fontSize:13,marginTop:8,fontWeight:500,letterSpacing:.5}}>{t.heroSub}</div>
        <div style={{display:"flex",gap:4,justifyContent:"center",marginTop:24}}>
          {[0,1,2].map(i=><div key={i} style={{width:8,height:8,borderRadius:4,background:c.neon,animation:`smDot 1.2s ease-in-out ${i*.15}s infinite`}}/>)}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
        @keyframes smIn{from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes smDot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
      `}</style>
    </div>);

  // ═══ SCANNER ═══
  if(screen==="scanner")return(
    <div style={{...phone,background:"#000"}}>
      <div style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={()=>{cam.stop();setScreen("home")}} style={{width:38,height:38,borderRadius:12,background:"rgba(0,255,136,.1)",border:`1px solid rgba(0,255,136,.2)`,color:c.neon,fontSize:18,cursor:"pointer"}}>←</button>
        <span style={{color:"#fff",fontSize:15,fontWeight:700,letterSpacing:.5}}>{t.scan}</span>
        <div style={{width:38}}/>
      </div>
      <div style={{position:"relative",flex:1,overflow:"hidden",margin:"0 16px",borderRadius:24,background:"#0A0A08",border:`1px solid rgba(0,255,136,.15)`}}>
        <video ref={cam.vRef} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:24}} playsInline muted/>
        <div style={{position:"absolute",inset:0,borderRadius:24,pointerEvents:"none"}}>
          {[[0,0],[1,0],[0,1],[1,1]].map(([x,y],i)=><div key={i} style={{position:"absolute",width:40,height:40,[y?"bottom":"top"]:20,[x?"right":"left"]:20,
            [y?"borderBottom":"borderTop"]:`2px solid ${c.neon}`,[x?"borderRight":"borderLeft"]:`2px solid ${c.neon}`,borderRadius:3}}/>)}
          {cam.active&&<div style={{position:"absolute",left:24,right:24,height:2,background:`linear-gradient(90deg,transparent,${c.neon},transparent)`,
            boxShadow:`0 0 12px ${c.neon}`,animation:"smSc 2s ease-in-out infinite"}}/>}
        </div>
      </div>
      <div style={{padding:"14px 16px 20px"}}>
        <div style={{display:"flex",gap:8}}>
          <input type="text" value={manualCode} onChange={e=>setManualCode(e.target.value)} placeholder={t.manualPlaceholder}
            style={{...inp,background:"rgba(0,255,136,.06)",borderColor:"rgba(0,255,136,.2)",color:"#fff",flex:1}}/>
          <button onClick={()=>{if(manualCode.length>=2){cam.stop();cam.setCode(manualCode)}}}
            style={{padding:"13px 20px",background:c.gradient,border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontSize:13,fontWeight:700,boxShadow:`0 4px 16px ${c.accentGlow}`}}>
            {t.lookupBarcode}</button>
        </div>
      </div>
      <style>{`@keyframes smSc{0%,100%{top:15%}50%{top:80%}}`}</style>
    </div>);

  // ═══ AUTH ═══
  if(screen==="auth")return(
    <div style={phone}><div style={{...inner,display:"flex",flexDirection:"column",justifyContent:"center",minHeight:580}}>
      <button onClick={()=>setScreen("home")} style={{width:38,height:38,borderRadius:12,background:c.input,border:`1px solid ${c.border}`,color:c.text,fontSize:18,cursor:"pointer",marginBottom:28}}>←</button>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{width:60,height:60,borderRadius:20,background:c.gradient,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:14,boxShadow:`0 12px 36px ${c.accentGlow}`}}>
          <span style={{fontSize:30}}>🩺</span></div>
        <div style={{fontSize:24,fontWeight:800,color:c.text}}>Soigne<span style={{color:c.neon}}>Moi</span></div>
      </div>
      {authMode==="signup"&&<input type="text" value={authName} onChange={e=>setAuthName(e.target.value)} placeholder={t.name} style={{...inp,marginBottom:10}}/>}
      <input type="email" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} placeholder={t.email} style={{...inp,marginBottom:10}}/>
      <input type="password" value={authPass} onChange={e=>setAuthPass(e.target.value)} placeholder={t.password} style={{...inp,marginBottom:16}}/>
      {authError&&<div style={{color:c.danger,fontSize:13,textAlign:"center",marginBottom:10}}>{authError}</div>}
      <button onClick={async()=>{setAuthError("");if(authMode==="login"){const r=await auth.login(authEmail,authPass);if(r.ok)setScreen("home");else setAuthError("Identifiants incorrects")}else{if(!authEmail||!authPass||!authName)return;await auth.signup(authEmail,authPass,authName);setScreen("home")}}} style={btnP}>
        {authMode==="login"?t.login:t.signup}</button>
      <div style={{textAlign:"center",marginTop:18}}>
        <button onClick={()=>setAuthMode(authMode==="login"?"signup":"login")} style={{background:"none",border:"none",color:c.neon,fontSize:14,cursor:"pointer",fontWeight:600,fontFamily:F}}>
          {authMode==="login"?t.signup:t.login}</button>
      </div>
    </div></div>);

  // ═══ DETAIL ═══
  if(screen==="detail"&&product){const p=product;const pR=ratings[p.id]||[];const avg=pR.length?(pR.reduce((a,r)=>a+r.stars,0)/pR.length).toFixed(1):null;
    const shareMsg=(t.shareText||"").replace("{name}",p.name)+`\n${p.indication||""}`;
    return(<div style={phone}><div style={inner}>
      <PhotoCard src={p._photo||PHOTOS.pills} c={c} style={{height:160}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button onClick={()=>{setScreen("home");setProduct(null)}} style={{width:36,height:36,borderRadius:12,background:"rgba(0,0,0,.4)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.15)",color:"#fff",fontSize:16,cursor:"pointer"}}>←</button>
          <div style={{flex:1}}><div style={{fontSize:17,fontWeight:800,color:"#fff",textShadow:"0 2px 8px rgba(0,0,0,.5)"}}>{p.name}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,.7)"}}>{p.lab} · {p.source}</div></div>
          <button onClick={()=>setShowShare(!showShare)} style={{width:36,height:36,borderRadius:12,background:"rgba(0,255,136,.2)",border:"1px solid rgba(0,255,136,.3)",color:c.neon,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>↗</button>
        </div>
      </PhotoCard>

      {showShare&&<GlowCard c={c} style={{display:"flex",gap:8,justifyContent:"center"}}>
        <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(shareMsg)}`,"_blank")} style={{padding:"8px 16px",background:"#25D366",border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700}}>WhatsApp</button>
        <button onClick={()=>window.open(`sms:?body=${encodeURIComponent(shareMsg)}`,"_blank")} style={{padding:"8px 16px",background:c.blue,border:"none",borderRadius:12,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700}}>SMS</button>
        <button onClick={async()=>{try{await navigator.clipboard.writeText(shareMsg);setCopied(true);setTimeout(()=>setCopied(false),2000)}catch(e){}}} style={{padding:"8px 16px",background:c.input,border:`1px solid ${c.inputBorder}`,borderRadius:12,color:c.text,cursor:"pointer",fontSize:12,fontWeight:700}}>{copied?"✓":t.shareCopy}</button>
      </GlowCard>}

      <div style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:12}}>
        {t.tabs.map((l,i)=><button key={l} onClick={()=>setTab(i)} style={{padding:"8px 16px",fontSize:12,fontWeight:700,borderRadius:24,
          border:i===tab?`1px solid ${c.neon}`:`1px solid ${c.border}`,background:i===tab?c.accentSoft:"transparent",
          color:i===tab?c.neon:c.sec,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0,fontFamily:F,
          boxShadow:i===tab?c.glow:"none"}}>{l}</button>)}
      </div>
      <GlowCard c={c}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:12*fs,fontWeight:700,color:c.neon}}>{t.tabs[tab]}</span>
          {tts.supported&&<button onClick={()=>tts.speaking?tts.stop():tts.speak(p[TAB_KEYS[tab]]||"")}
            style={{padding:"4px 12px",borderRadius:14,border:`1px solid ${tts.speaking?c.dangerBorder:c.accentBorder}`,
              background:tts.speaking?c.dangerSoft:c.accentSoft,color:tts.speaking?c.danger:c.neon,cursor:"pointer",
              fontSize:11,fontWeight:700,fontFamily:F,display:"flex",alignItems:"center",gap:4}}>
            {tts.speaking?"⏹":"🔊"} {tts.speaking?t.ttsStop:t.ttsPlay}</button>}
        </div>
        <p style={{fontSize:14*fs,lineHeight:1.7,color:c.text,margin:0,whiteSpace:"pre-wrap"}}>{p[TAB_KEYS[tab]]||"—"}</p>
      </GlowCard>

      {/* Ratings */}
      <GlowCard c={c} style={{background:c.card2}}>
        <div style={{fontSize:12,fontWeight:700,color:c.neon,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>{t.rateTitle}</div>
        {avg&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <span style={{fontSize:22,fontWeight:800,color:c.amber}}>{"★".repeat(Math.round(avg))}</span>
          <span style={{fontSize:14,fontWeight:700,color:c.text}}>{avg}</span>
          <span style={{fontSize:12,color:c.sec}}>({pR.length} {t.rateCount})</span></div>}
        {pR.slice(-3).map((r,i)=><div key={i} style={{padding:"8px 0",borderTop:`1px solid ${c.border}`,fontSize:13}}>
          <span style={{color:c.amber}}>{"★".repeat(r.stars)}</span><span style={{color:c.ter}}>{"★".repeat(5-r.stars)}</span>
          <div style={{color:c.text,marginTop:4}}>{r.text}</div></div>)}
        {pR.length===0&&<div style={{fontSize:13,color:c.ter,marginBottom:10}}>{t.rateEmpty}</div>}
        <div style={{display:"flex",gap:4,marginBottom:8}}>{[1,2,3,4,5].map(s=><button key={s} onClick={()=>setRateStars(s)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:s<=rateStars?c.amber:c.ter}}>★</button>)}</div>
        <div style={{display:"flex",gap:8}}>
          <input value={rateInput} onChange={e=>setRateInput(e.target.value)} placeholder={t.ratePlaceholder} style={{...inp,flex:1,fontSize:13}}/>
          <button onClick={()=>{if(!rateInput.trim())return;saveRatings({...ratings,[p.id]:[...(ratings[p.id]||[]),{stars:rateStars,text:rateInput,date:Date.now()}]});setRateInput("")}}
            style={{padding:"10px 18px",background:c.gradient,border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,flexShrink:0}}>{t.rateSubmit}</button>
        </div>
      </GlowCard>
      <div style={{fontSize:11,color:c.ter,textAlign:"center",padding:"10px 8px",lineHeight:1.5}}>{t.disclaimer}</div>
    </div></div>);
  }

  // ═══════════════════════════════════════════════════════════
  // MAIN HOME
  // ═══════════════════════════════════════════════════════════
  return(<div style={phone}><div style={inner}>

    {/* HEADER */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:40,height:40,borderRadius:14,background:c.gradient,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:`0 4px 16px ${c.accentGlow}`}}>
          <span style={{fontSize:20}}>🩺</span></div>
        <div><div style={{fontSize:18,fontWeight:800,color:c.text,letterSpacing:-.3}}>Soigne<span style={{color:c.neon}}>Moi</span></div>
          {auth.user&&<div style={{fontSize:10,color:c.neon,fontWeight:600}}>{t.hello}, {auth.user.name?.split(" ")[0]}</div>}</div>
      </div>
      <div style={{display:"flex",gap:5}}>
        <button onClick={()=>setShowAccess(!showAccess)} title={t.accessLabel} style={{width:32,height:32,borderRadius:10,background:showAccess?c.accentSoft:c.input,border:`1px solid ${showAccess?c.accentBorder:c.border}`,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>♿</button>
        <button onClick={()=>setShowLang(!showLang)} style={{width:32,height:32,borderRadius:10,background:c.input,border:`1px solid ${c.border}`,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{LANGS.find(l=>l.code===lang)?.flag}</button>
        <button onClick={toggle} style={{width:32,height:32,borderRadius:10,background:c.input,border:`1px solid ${c.border}`,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>{dark?"☀️":"🌙"}</button>
        {auth.user?<button onClick={()=>setNavTab("profile")} style={{width:32,height:32,borderRadius:10,background:c.gradient,border:"none",cursor:"pointer",color:"#fff",fontWeight:800,fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 2px 8px ${c.accentGlow}`}}>{(auth.user.name||"U")[0].toUpperCase()}</button>:
          <button onClick={()=>{setScreen("auth");setAuthError("")}} style={{width:32,height:32,borderRadius:10,background:c.input,border:`1px solid ${c.border}`,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>👤</button>}
      </div>
    </div>

    {showLang&&<GlowCard c={c} style={{marginBottom:12}}>{LANGS.map(l=><button key={l.code} onClick={()=>{setLang(l.code);setShowLang(false)}} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:14,border:l.code===lang?`1px solid ${c.neon}`:`1px solid ${c.border}`,background:l.code===lang?c.accentSoft:"transparent",cursor:"pointer",width:"100%",marginBottom:4,boxSizing:"border-box",fontFamily:F}}>
      <span>{l.flag}</span><span style={{color:l.code===lang?c.neon:c.text,fontWeight:l.code===lang?700:400}}>{l.label}</span></button>)}</GlowCard>}

    {/* ═══ ACCESSIBILITY PANEL ═══ */}
    {showAccess&&<GlowCard c={c} glow style={{marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
        <span style={{fontSize:20}}>♿</span>
        <span style={{fontSize:15,fontWeight:800,color:c.neon}}>{t.accessLabel}</span>
      </div>
      {/* Auto TTS toggle */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${c.border}`}}>
        <div><div style={{fontSize:13*fs,fontWeight:600,color:c.text}}>🔊 {t.accessTTS}</div>
          <div style={{fontSize:11*fs,color:c.sec}}>{ lang==="en"?"AI responses read automatically":"Réponses IA lues automatiquement"}</div></div>
        <button onClick={tts.toggleAutoRead} style={{padding:"6px 16px",borderRadius:20,border:`1.5px solid ${tts.autoRead?c.neon:c.border}`,
          background:tts.autoRead?c.accentSoft:"transparent",color:tts.autoRead?c.neon:c.ter,cursor:"pointer",fontSize:12*fs,fontWeight:700,fontFamily:F,
          boxShadow:tts.autoRead?c.glow:"none"}}>{tts.autoRead?t.accessOn:t.accessOff}</button>
      </div>
      {/* Large text toggle */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0"}}>
        <div><div style={{fontSize:13*fs,fontWeight:600,color:c.text}}>🔤 {t.accessLargeText}</div>
          <div style={{fontSize:11*fs,color:c.sec}}>{lang==="en"?"Increase text size":"Augmenter la taille du texte"}</div></div>
        <button onClick={toggleLargeText} style={{padding:"6px 16px",borderRadius:20,border:`1.5px solid ${largeText?c.neon:c.border}`,
          background:largeText?c.accentSoft:"transparent",color:largeText?c.neon:c.ter,cursor:"pointer",fontSize:12*fs,fontWeight:700,fontFamily:F,
          boxShadow:largeText?c.glow:"none"}}>{largeText?t.accessOn:t.accessOff}</button>
      </div>
    </GlowCard>}

    {/* ═══ FULL-SCREEN VOICE INPUT MODE ═══ */}
    {voiceMode&&<div style={{position:"fixed",inset:0,zIndex:100,background:c.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24}}>
      {/* Animated listening indicator */}
      <div style={{position:"relative",width:140,height:140,marginBottom:32}}>
        <div style={{position:"absolute",inset:0,borderRadius:"50%",background:c.accentSoft,border:`2px solid ${c.accentBorder}`,
          animation:voice.on?"smVoicePulse 1.5s ease-in-out infinite":"none"}}/>
        <div style={{position:"absolute",inset:15,borderRadius:"50%",background:c.accentSoft,border:`2px solid ${c.neon}`,
          animation:voice.on?"smVoicePulse 1.5s ease-in-out .3s infinite":"none"}}/>
        <div style={{position:"absolute",inset:30,borderRadius:"50%",background:c.gradient,display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:`0 0 40px ${c.accentGlow}`}}>
          <span style={{fontSize:40,color:"#fff"}}>{voice.on?"🎤":"🎙️"}</span>
        </div>
      </div>

      <div style={{fontSize:18*fs,fontWeight:800,color:voice.error?c.danger:c.neon,textAlign:"center",marginBottom:8}}>
        {voice.error?voice.error:voice.on?t.voiceListening:t.voiceReady}
      </div>

      {/* Error message with visual guide to enable mic */}
      {voice.error&&<div style={{maxWidth:340,width:"100%",marginBottom:16}}>
        <GlowCard c={c} style={{background:c.dangerSoft,borderColor:c.dangerBorder}}>
          <div style={{fontSize:14*fs,fontWeight:700,color:c.danger,marginBottom:10,textAlign:"center"}}>
            {lang==="en"?"🎤 Microphone access required":"🎤 Accès au micro requis"}
          </div>
          <div style={{fontSize:12*fs,color:c.text,lineHeight:1.7}}>
            {lang==="en"?<>
              <div style={{fontWeight:700,marginBottom:6}}>📱 On mobile (iPhone/Android):</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Settings → Safari/Chrome → Microphone → <span style={{color:c.neon,fontWeight:700}}>Allow</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>💻 On Chrome (desktop):</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Click the 🔒 padlock in the address bar → Site settings → Microphone → <span style={{color:c.neon,fontWeight:700}}>Allow</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>🦊 On Firefox:</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Click the 🔒 padlock → Permissions → Microphone → <span style={{color:c.neon,fontWeight:700}}>Allow</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>🍎 On Safari (Mac):</div>
              <div style={{paddingLeft:12}}>
                Safari → Settings → Websites → Microphone → <span style={{color:c.neon,fontWeight:700}}>Allow</span>
              </div>
            </>:<>
              <div style={{fontWeight:700,marginBottom:6}}>📱 Sur mobile (iPhone/Android) :</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Réglages → Safari/Chrome → Microphone → <span style={{color:c.neon,fontWeight:700}}>Autoriser</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>💻 Sur Chrome (ordinateur) :</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Cliquez sur le 🔒 cadenas dans la barre d'adresse → Paramètres du site → Micro → <span style={{color:c.neon,fontWeight:700}}>Autoriser</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>🦊 Sur Firefox :</div>
              <div style={{paddingLeft:12,marginBottom:10}}>
                Cliquez sur le 🔒 cadenas → Autorisations → Micro → <span style={{color:c.neon,fontWeight:700}}>Autoriser</span>
              </div>
              <div style={{fontWeight:700,marginBottom:6}}>🍎 Sur Safari (Mac) :</div>
              <div style={{paddingLeft:12}}>
                Safari → Réglages → Sites web → Microphone → <span style={{color:c.neon,fontWeight:700}}>Autoriser</span>
              </div>
            </>}
          </div>
          <div style={{marginTop:12,padding:"8px 14px",background:c.amberSoft,border:`1px solid ${c.amberBorder}`,borderRadius:12,fontSize:11*fs,color:c.amber,textAlign:"center"}}>
            {lang==="en"?"⚠️ After changing permissions, refresh the page":"⚠️ Après avoir changé les permissions, rafraîchissez la page"}
          </div>
          <button onClick={()=>{voice.reset();voice.start()}} style={{width:"100%",marginTop:12,padding:"12px",background:c.gradient,border:"none",
            borderRadius:14,color:"#fff",cursor:"pointer",fontSize:13*fs,fontWeight:700,fontFamily:F,boxShadow:`0 4px 16px ${c.accentGlow}`}}>
            {lang==="en"?"🔄 Try again":"🔄 Réessayer"}
          </button>
        </GlowCard>
      </div>}

      {voice.confidence>0&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
        <div style={{width:60,height:4,borderRadius:2,background:c.border,overflow:"hidden"}}>
          <div style={{width:`${voice.confidence}%`,height:"100%",background:c.neon,borderRadius:2,transition:"width .3s"}}/>
        </div>
        <span style={{fontSize:11,color:c.sec}}>{voice.confidence}%</span>
      </div>}

      {/* Live transcription display */}
      {chatInput&&<div style={{maxWidth:340,width:"100%",marginBottom:24}}>
        <GlowCard c={c} glow style={{background:c.card2}}>
          <div style={{fontSize:11,fontWeight:700,color:c.neon,marginBottom:6,letterSpacing:.5}}>TRANSCRIPTION</div>
          <div style={{fontSize:15*fs,color:c.text,lineHeight:1.6,minHeight:40}}>{chatInput}</div>
        </GlowCard>
      </div>}

      {/* Action buttons */}
      <div style={{display:"flex",gap:12,marginTop:8}}>
        {!voice.on&&<button onClick={()=>{voice.start()}} style={{width:56,height:56,borderRadius:18,background:c.gradient,border:"none",
          cursor:"pointer",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",
          boxShadow:`0 8px 24px ${c.accentGlow}`}}>🎤</button>}
        {voice.on&&<button onClick={()=>{voice.stop()}} style={{width:56,height:56,borderRadius:18,background:c.dangerSoft,border:`2px solid ${c.dangerBorder}`,
          cursor:"pointer",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",
          animation:"smVoicePulse 1s ease-in-out infinite"}}>⏹</button>}
        {chatInput.trim()&&<button onClick={sendVoice} style={{width:56,height:56,borderRadius:18,background:c.gradient,border:"none",
          cursor:"pointer",fontSize:22,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",
          boxShadow:`0 8px 24px ${c.accentGlow}`}}>✓</button>}
      </div>

      {/* Labels */}
      <div style={{display:"flex",gap:24,marginTop:12}}>
        {!voice.on&&<span style={{fontSize:11*fs,color:c.sec}}>{t.voiceHint}</span>}
        {voice.on&&<span style={{fontSize:11*fs,color:c.danger,fontWeight:600}}>{lang==="en"?"Tap ⏹ when done":"Appuyez ⏹ quand fini"}</span>}
        {chatInput.trim()&&<span style={{fontSize:11*fs,color:c.neon,fontWeight:600}}>{t.voiceSend}</span>}
      </div>

      {/* Cancel */}
      <button onClick={()=>{voice.stop();voice.reset();setChatInput("");setVoiceMode(false)}} style={{marginTop:28,padding:"10px 28px",
        background:"transparent",border:`1px solid ${c.border}`,borderRadius:14,color:c.sec,cursor:"pointer",fontSize:13*fs,fontFamily:F}}>
        {t.voiceCancel}
      </button>
    </div>}

    {/* ═══ AI TAB ═══ */}
    {navTab==="ai"&&<>
      {/* Hero banner with photo */}
      {ai.msgs.length===0&&<PhotoCard src={PHOTOS.stethoscope} c={c} style={{height:150,marginBottom:14}}>
        <div style={{fontSize:22,fontWeight:800,color:"#fff",lineHeight:1.2,textShadow:"0 2px 12px rgba(0,0,0,.6)",whiteSpace:"pre-line"}}>{t.heroTitle}</div>
        <div style={{fontSize:12,color:c.neon,fontWeight:600,marginTop:4,textShadow:"0 1px 8px rgba(0,0,0,.5)"}}>{t.heroSub}</div>
      </PhotoCard>}

      <div style={{textAlign:"center",marginBottom:12}}>
        <div style={{fontSize:18,fontWeight:800,color:c.text}}>{t.aiTitle}</div>
        <div style={{fontSize:12,color:c.sec,marginTop:2}}>{t.aiSub}</div>
      </div>

      {(dossier.allergies.length>0||dossier.meds.length>0)&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",
        background:c.accentSoft,border:`1px solid ${c.accentBorder}`,borderRadius:14,marginBottom:10,fontSize:11,color:c.neon}}>
        <span>📋</span><span style={{fontWeight:700}}>{t.aiContext}</span>
        <span style={{color:c.sec}}>({dossier.allergies.length}A · {dossier.meds.length}T)</span>
      </div>}

      <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:12,minHeight:160}}>
        {ai.msgs.length===0&&<GlowCard c={c} glow style={{background:c.accentSoft,borderColor:c.accentBorder}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <NeonBadge icon="🩺" c={c} size={28} glow/>
            <span style={{fontSize:12,fontWeight:800,color:c.neon,letterSpacing:.5}}>SoigneMoi IA</span></div>
          <div style={{fontSize:13,color:c.text,lineHeight:1.65,whiteSpace:"pre-wrap"}}><MdText text={t.aiWelcome} c={c}/></div>
        </GlowCard>}

        {ai.msgs.map((m,i)=><GlowCard key={i} c={c} style={{background:m.role==="user"?c.blueSoft:c.card,borderColor:m.role==="user"?c.blueBorder:c.border,
          marginLeft:m.role==="user"?16:0,marginRight:m.role==="assistant"?16:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
            <div style={{fontSize:11*fs,fontWeight:700,color:m.role==="user"?c.blue:c.neon,letterSpacing:.3}}>
              {m.role==="user"?"Vous":"🩺 SoigneMoi IA"}</div>
            {m.role==="assistant"&&tts.supported&&<button onClick={()=>tts.speaking?tts.stop():tts.speak(m.content)}
              title={tts.speaking?t.ttsStop:t.ttsPlay}
              style={{padding:"3px 10px",borderRadius:16,border:`1px solid ${tts.speaking?c.dangerBorder:c.accentBorder}`,
                background:tts.speaking?c.dangerSoft:c.accentSoft,color:tts.speaking?c.danger:c.neon,cursor:"pointer",
                fontSize:12,fontWeight:700,fontFamily:F,display:"flex",alignItems:"center",gap:4,
                boxShadow:tts.speaking?"none":c.glow,animation:tts.speaking?"smPulseBtn 1s infinite":"none"}}>
              {tts.speaking?"⏹":"🔊"}<span style={{fontSize:10*fs}}>{tts.speaking?t.ttsStop:t.ttsPlay}</span></button>}
          </div>
          <div style={{fontSize:13*fs,color:c.text,lineHeight:1.7,whiteSpace:"pre-wrap"}}><MdText text={m.content} c={c}/></div>
        </GlowCard>)}

        {ai.loading&&<GlowCard c={c} glow style={{background:c.accentSoft,borderColor:c.accentBorder}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:3,background:c.neon,animation:`smDot 1s ease-in-out ${i*.15}s infinite`}}/>)}</div>
            <span style={{fontSize:13,color:c.neon,fontWeight:600}}>{t.aiThinking}</span></div>
        </GlowCard>}
        <div ref={chatEndRef}/>
      </div>

      {/* TTS indicator bar */}
      {tts.speaking&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px",background:c.accentSoft,border:`1px solid ${c.accentBorder}`,
        borderRadius:12,marginBottom:8}}>
        <div style={{display:"flex",gap:2}}>{[0,1,2,3,4].map(i=><div key={i} style={{width:3,height:12+i*3,borderRadius:2,background:c.neon,
          animation:`smBar .6s ease-in-out ${i*.08}s infinite alternate`}}/>)}</div>
        <span style={{fontSize:11*fs,color:c.neon,fontWeight:600,flex:1}}>{t.ttsReading}</span>
        <button onClick={tts.stop} style={{padding:"3px 12px",borderRadius:10,border:`1px solid ${c.dangerBorder}`,background:c.dangerSoft,
          color:c.danger,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:F}}>⏹ {t.ttsStop}</button>
      </div>}

      {/* Mic error inline */}
      {voice.error&&navTab==="ai"&&<div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",
        background:c.dangerSoft,border:`1px solid ${c.dangerBorder}`,borderRadius:12,marginBottom:8,fontSize:11*fs,color:c.danger}}>
        <span>⚠️</span><span>{voice.error}</span>
      </div>}

      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        {/* Big mic button → opens full-screen voice mode */}
        <button onClick={async()=>{tts.stop();setVoiceMode(true);voice.start()}}
          style={{width:42,height:42,borderRadius:14,
          background:voice.ok?c.gradient:c.input,border:voice.ok?"none":`1px solid ${c.border}`,
          cursor:"pointer",fontSize:17,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
          boxShadow:voice.ok?`0 4px 16px ${c.accentGlow}`:"none",color:voice.ok?"#fff":c.ter,position:"relative",
          opacity:voice.ok?1:.5}}>
          🎤
          {voice.ok&&<div style={{position:"absolute",bottom:-2,right:-2,width:10,height:10,borderRadius:5,background:c.neon,border:`2px solid ${c.bg}`,
            animation:"smDot 2s infinite"}}/>}
        </button>
        <input type="text" value={chatInput} onChange={e=>setChatInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&chatInput.trim()){ai.send(chatInput);setChatInput("")}}}
          placeholder={t.aiPlaceholder} style={{...inp,flex:1}}/>
        <button onClick={()=>{if(chatInput.trim()){ai.send(chatInput);setChatInput("")}}} disabled={ai.loading||!chatInput.trim()}
          style={{width:42,height:42,borderRadius:14,background:chatInput.trim()?c.gradient:c.input,border:"none",
            cursor:chatInput.trim()?"pointer":"default",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",
            color:"#fff",flexShrink:0,opacity:chatInput.trim()?1:.4,transition:"all .15s",boxShadow:chatInput.trim()?`0 4px 16px ${c.accentGlow}`:"none"}}>↑</button>
      </div>
      {ai.msgs.length>0&&<button onClick={ai.clear} style={{marginTop:8,padding:"9px",background:"transparent",border:`1px solid ${c.border}`,
        borderRadius:12,color:c.sec,cursor:"pointer",fontSize:12,width:"100%",fontFamily:F}}>{t.aiClear}</button>}
    </>}

    {/* ═══ SEARCH TAB ═══ */}
    {navTab==="search"&&<>
      <PhotoCard src={PHOTOS.scan} c={c} onClick={()=>{setScreen("scanner");cam.start();cam.setCode(null);api.clear()}} style={{height:120,cursor:"pointer"}}>
        <div style={{fontSize:28}}>📷</div>
        <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>{t.scan}</div>
      </PhotoCard>

      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <div style={{position:"relative",flex:1}}>
          <span style={{position:"absolute",left:16,top:14,fontSize:14,color:c.ter}}>🔍</span>
          <input type="text" value={search} onChange={e=>{setSearch(e.target.value);api.clear()}}
            onKeyDown={e=>{if(e.key==="Enter"&&search.length>=2)api.search(search,t)}}
            placeholder={t.search} style={{...inp,paddingLeft:40}}/></div>
      </div>

      {search.length>=2&&!api.searched&&<button onClick={()=>api.search(search,t)} style={{...btnSec,marginBottom:10,textAlign:"center"}}>🌐 {t.searchOnline}</button>}
      {api.loading&&<div style={{textAlign:"center",padding:16}}>
        <div style={{width:"60%",height:3,margin:"0 auto",borderRadius:4,background:`linear-gradient(90deg,${c.neon},${c.blue},${c.neon})`,backgroundSize:"200% 100%",animation:"smSh 1.5s linear infinite"}}/>
        <div style={{fontSize:12,color:c.sec,marginTop:8}}>{api.progress}</div></div>}
      {api.searched&&!api.loading&&api.results.length===0&&<div style={{textAlign:"center",padding:20,color:c.sec}}>{t.noAPIResults}</div>}
      {api.searched&&!api.loading&&api.results.map(p=>{
        const srcIcon={"BDPM":"🇫🇷","BDPM-CIP":"🇫🇷","FDA":"🇺🇸","FDA-NDC":"🇺🇸","OpenFoodFacts":"📦","Parapharmacie":"🧴","DailyMed":"🏥"}[p.source]||"💊";
        const hasPhoto=p._photo||p.image;
        return(<GlowCard key={p.id} c={c} onClick={()=>open(p)} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:12}}>
          {hasPhoto&&typeof hasPhoto==="string"&&hasPhoto.startsWith("http")?
            <div style={{width:42,height:42,borderRadius:12,overflow:"hidden",flexShrink:0,border:`1px solid ${c.border}`}}>
              <img src={hasPhoto} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy"/></div>:
            <NeonBadge icon={srcIcon} c={c} size={42}/>}
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:13*fs,fontWeight:700,color:c.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
            <div style={{fontSize:11,color:c.sec}}>{p.lab?p.lab+" · ":""}{p.source}</div></div>
          <div style={{color:c.neon,fontSize:14}}>›</div>
        </GlowCard>)})}
    </>}

    {/* ═══ CPAM TAB ═══ */}
    {navTab==="cpam"&&<>
      <PhotoCard src={PHOTOS.health} c={c} style={{height:100}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{t.cpamTitle}</div>
        <div style={{fontSize:11,color:"rgba(255,255,255,.7)"}}>{t.cpamSub}</div>
      </PhotoCard>
      <div style={{display:"flex",gap:8,marginBottom:14}}>
        <input type="text" value={cpamSearch} onChange={e=>{setCpamSearch(e.target.value);setCpamSearched(false);setCpamResult(null)}}
          onKeyDown={e=>{if(e.key==="Enter")searchCPAM()}} placeholder={t.cpamSearch} style={{...inp,flex:1}}/>
        <button onClick={searchCPAM} style={{padding:"13px 20px",background:c.gradient,border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontSize:15,fontWeight:700,boxShadow:`0 4px 16px ${c.accentGlow}`}}>🔍</button>
      </div>

      {cpamSearched&&cpamResult&&<GlowCard c={c} glow style={{padding:"20px 18px"}}>
        <div style={{fontSize:18,fontWeight:800,color:c.text,marginBottom:6}}>{cpamResult.name}</div>
        <NeonPill c={c} variant="amber" style={{marginBottom:14}}>{cpamResult.categorie}</NeonPill>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <div style={{background:c.accentSoft,border:`1px solid ${c.accentBorder}`,borderRadius:16,padding:"14px",textAlign:"center",boxShadow:c.glow}}>
            <div style={{fontSize:11,color:c.neon,fontWeight:700,marginBottom:4}}>{t.cpamRate}</div>
            <div style={{fontSize:30,fontWeight:800,color:c.neon}}>{cpamResult.taux}%</div></div>
          <div style={{background:c.greenSoft,border:`1px solid ${c.greenBorder}`,borderRadius:16,padding:"14px",textAlign:"center"}}>
            <div style={{fontSize:11,color:c.green,fontWeight:700,marginBottom:4}}>Prix</div>
            <div style={{fontSize:30,fontWeight:800,color:c.green}}>{cpamResult.prix}€</div></div>
        </div>
        {[{l:t.cpamRefund,v:(cpamResult.prix*cpamResult.taux/100).toFixed(2)+"€",col:c.green},
          {l:t.cpamRemain,v:(cpamResult.prix-cpamResult.prix*cpamResult.taux/100).toFixed(2)+"€",col:c.danger},
          {l:t.cpamMutuelle,v:"~"+Math.max(0,cpamResult.prix-cpamResult.prix*Math.min(100,cpamResult.taux+30)/100).toFixed(2)+"€",col:c.amber}]
          .map((r,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:i<2?`1px solid ${c.border}`:"none"}}>
            <span style={{fontSize:14,color:c.sec}}>{r.l}</span><span style={{fontSize:14,fontWeight:800,color:r.col}}>{r.v}</span></div>)}
      </GlowCard>}
      {cpamSearched&&!cpamResult&&<GlowCard c={c} style={{textAlign:"center",padding:20}}><div style={{fontSize:28,marginBottom:8}}>🤔</div><div style={{fontSize:14,color:c.sec}}>{t.cpamNoResult}</div></GlowCard>}
      <div style={{fontSize:11,color:c.ter,textAlign:"center",padding:8}}>{t.cpamInfo}</div>
    </>}

    {/* ═══ CALENDAR TAB ═══ */}
    {navTab==="calendar"&&<>
      <PhotoCard src={PHOTOS.calendar} c={c} style={{height:100}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{t.calTitle}</div>
      </PhotoCard>
      <GlowCard c={c}>
        <select value={calType} onChange={e=>setCalType(e.target.value)} style={{...inp,marginBottom:8,appearance:"auto"}}>
          {(t.calTypes).map(ty=><option key={ty} value={ty}>{ty}</option>)}</select>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <input type="date" value={calDate} onChange={e=>setCalDate(e.target.value)} style={{...inp,flex:1}}/>
          <input type="time" value={calTime2} onChange={e=>setCalTime2(e.target.value)} style={{...inp,flex:1}}/></div>
        <input type="text" value={calDoc} onChange={e=>setCalDoc(e.target.value)} placeholder={t.calDoctor} style={{...inp,marginBottom:8}}/>
        <input type="text" value={calNote} onChange={e=>setCalNote(e.target.value)} placeholder={t.calNote} style={{...inp,marginBottom:10}}/>
        <button onClick={()=>{if(!calDate)return;saveCal([...calEvents,{id:Date.now(),type:calType,date:calDate,time:calTime2,doctor:calDoc,note:calNote}].sort((a,b)=>new Date(a.date)-new Date(b.date)));setCalDoc("");setCalNote("");setCalDate("")}} style={btnP}>{t.calAdd}</button>
      </GlowCard>
      {calEvents.length>0&&<div style={{fontSize:12,fontWeight:700,color:c.neon,letterSpacing:1,textTransform:"uppercase",marginTop:4,marginBottom:8}}>{t.calUpcoming}</div>}
      {calEvents.filter(e=>new Date(e.date)>=new Date(new Date().toDateString())).map(e=>{
        const icons={"Consultation":"🩺","Vaccin":"💉","Vaccine":"💉","Examen":"🔬","Exam":"🔬","Spécialiste":"👨‍⚕️","Specialist":"👨‍⚕️","Dentiste":"🦷","Dentist":"🦷","Ophtalmo":"👁️","Eye doctor":"👁️"};
        return(<GlowCard key={e.id} c={c} style={{display:"flex",alignItems:"center",gap:12}}>
          <NeonBadge icon={icons[e.type]||"📋"} c={c}/>
          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:c.text}}>{e.type}</div>
            <div style={{fontSize:12,color:c.sec}}>{new Date(e.date).toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})} à {e.time}</div>
            {e.doctor&&<div style={{fontSize:12,color:c.neon}}>{e.doctor}</div>}</div>
          <button onClick={()=>saveCal(calEvents.filter(x=>x.id!==e.id))} style={{padding:"6px 10px",borderRadius:10,border:`1px solid ${c.dangerBorder}`,background:c.dangerSoft,color:c.danger,cursor:"pointer",fontSize:12,fontWeight:700}}>×</button>
        </GlowCard>)})}
      {calEvents.length===0&&<div style={{textAlign:"center",color:c.ter,padding:24}}>{t.calNoEvents}</div>}
    </>}

    {/* ═══ NEARBY TAB ═══ */}
    {navTab==="nearby"&&<>
      {!geo.loc&&!geo.loading&&<PhotoCard src={PHOTOS.hospital} c={c} style={{height:180}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff",marginBottom:8}}>{t.nearbyTitle}</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.7)",marginBottom:12}}>{t.noLocation}</div>
        <button onClick={geo.locate} style={{...btnP,width:"auto",padding:"10px 24px",fontSize:13}}>📍 Activer</button>
      </PhotoCard>}
      {geo.loading&&<div style={{textAlign:"center",padding:30,color:c.neon}}>{t.locating}</div>}
      {geo.loc&&<>
        <PhotoCard src={PHOTOS.pharmacy} c={c} onClick={()=>geo.openMaps("pharmacie")} style={{height:130,cursor:"pointer"}}>
          <div style={{fontSize:28}}>💊</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>{t.findPharmacy}</div>
          <div style={{fontSize:12,color:c.neon,fontWeight:600}}>→ {t.openMaps}</div>
        </PhotoCard>
        <PhotoCard src={PHOTOS.emergency} c={c} onClick={()=>geo.openMaps("urgences hôpital")} style={{height:130,cursor:"pointer"}}>
          <div style={{fontSize:28}}>🏥</div>
          <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>{t.findER}</div>
          <div style={{fontSize:12,color:"#FF6E40",fontWeight:600}}>→ {t.openMaps}</div>
        </PhotoCard>
        <GlowCard c={c} glow style={{textAlign:"center"}}>
          <div style={{fontSize:32,fontWeight:800,color:c.danger,letterSpacing:3}}>📞 15</div>
          <div style={{fontSize:12,color:c.sec,fontWeight:600}}>SAMU — Urgence vitale</div>
        </GlowCard>
      </>}
    </>}

    {/* ═══ INTERACTIONS TAB ═══ */}
    {navTab==="interactions"&&<>
      <PhotoCard src={PHOTOS.lab} c={c} style={{height:100}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{t.interactionsTitle}</div>
      </PhotoCard>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input type="text" value={interInput} onChange={e=>setInterInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&interInput.trim()){setInterMeds(m=>[...m,interInput.trim()]);setInterInput("");setInterResults(null);setInterAI(null)}}}
          placeholder={t.addMed} style={{...inp,flex:1}}/>
        <button onClick={()=>{if(interInput.trim()){setInterMeds(m=>[...m,interInput.trim()]);setInterInput("");setInterResults(null);setInterAI(null)}}}
          style={{padding:"13px 20px",background:c.gradient,border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontSize:18,fontWeight:700,boxShadow:`0 4px 16px ${c.accentGlow}`}}>+</button>
      </div>
      {interMeds.length>0&&<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
        {interMeds.map((m,i)=><NeonPill key={i} c={c}>{m}<button onClick={()=>{setInterMeds(ms=>ms.filter((_,j)=>j!==i));setInterResults(null);setInterAI(null)}}
          style={{background:"none",border:"none",color:c.ter,cursor:"pointer",fontSize:14,padding:"0 0 0 4px"}}>×</button></NeonPill>)}</div>}
      {interMeds.length>=2&&<div style={{display:"flex",gap:8,marginBottom:12}}>
        <button onClick={checkInter} style={{...btnP,flex:1}}>{t.checkInteractions}</button>
        <button onClick={checkInterAI} disabled={interAILoading} style={{...btnP,flex:1,background:`linear-gradient(135deg,${c.purple},#9C27B0)`,boxShadow:`0 4px 20px rgba(124,77,255,.25)`,opacity:interAILoading?.6:1}}>
          {interAILoading?"...":t.checkWithAI}</button>
      </div>}
      {interResults!==null&&(interResults.length===0?
        <GlowCard c={c} glow style={{background:c.greenSoft,borderColor:c.greenBorder,textAlign:"center"}}>
          <div style={{fontSize:24,marginBottom:6}}>✅</div><div style={{fontSize:15,fontWeight:700,color:c.green}}>{t.noInteraction}</div></GlowCard>:
        interResults.map((r,i)=><GlowCard key={i} c={c} style={{background:r.level==="danger"?c.dangerSoft:r.level==="ok"?c.greenSoft:c.amberSoft,
          borderColor:r.level==="danger"?c.dangerBorder:r.level==="ok"?c.greenBorder:c.amberBorder}}>
          <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
            <span>{r.level==="danger"?"🚨":r.level==="ok"?"✅":"⚠️"}</span>
            <span style={{fontSize:14,fontWeight:800,color:r.level==="danger"?c.danger:r.level==="ok"?c.green:c.amber}}>
              {r.level==="danger"?t.dangerInteraction:r.level==="ok"?"OK":t.warningInteraction}</span></div>
          <div style={{fontSize:13,color:c.text,fontWeight:700}}>{r.pair.join(" + ")}</div>
          <div style={{fontSize:13,color:c.sec,marginTop:4}}>{lang==="en"?r.en:r.fr}</div>
        </GlowCard>))}
      {interAI&&<GlowCard c={c} glow style={{background:c.purpleSoft,borderColor:c.purpleBorder}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:16}}>🤖</span><span style={{fontSize:13,fontWeight:800,color:c.purple,letterSpacing:.5}}>Analyse IA</span></div>
          {tts.supported&&<button onClick={()=>tts.speaking?tts.stop():tts.speak(interAI)}
            style={{padding:"3px 10px",borderRadius:14,border:`1px solid ${tts.speaking?c.dangerBorder:c.purpleBorder}`,
              background:tts.speaking?c.dangerSoft:c.purpleSoft,color:tts.speaking?c.danger:c.purple,cursor:"pointer",
              fontSize:11,fontWeight:700,fontFamily:F,display:"flex",alignItems:"center",gap:4}}>
            {tts.speaking?"⏹":"🔊"}</button>}
        </div>
        <div style={{fontSize:13*fs,color:c.text,lineHeight:1.7,whiteSpace:"pre-wrap"}}><MdText text={interAI} c={c}/></div>
      </GlowCard>}
    </>}

    {/* ═══ REMINDERS TAB ═══ */}
    {navTab==="reminders"&&<>
      <div style={{fontSize:20,fontWeight:800,color:c.text,marginBottom:14}}>{t.remindersTitle}</div>
      <GlowCard c={c}>
        <input type="text" value={remName} onChange={e=>setRemName(e.target.value)} placeholder={t.reminderName} style={{...inp,marginBottom:8}}/>
        <div style={{display:"flex",gap:8,marginBottom:8}}>
          <input type="time" value={remTime} onChange={e=>setRemTime(e.target.value)} style={{...inp,flex:1}}/>
          <select value={remFreq} onChange={e=>setRemFreq(e.target.value)} style={{...inp,flex:1,appearance:"auto"}}>
            <option value="daily">{t.daily}</option><option value="twice">{t.twiceDaily}</option>
            <option value="three">{t.threeDaily}</option><option value="weekly">{t.weekly}</option></select>
        </div>
        <button onClick={()=>{if(!remName.trim())return;saveRem([...reminders,{id:Date.now(),name:remName,time:remTime,freq:remFreq,active:true}]);setRemName("")}} style={btnP}>{t.addReminder}</button>
      </GlowCard>
      {reminders.map(r=><GlowCard key={r.id} c={c} style={{display:"flex",alignItems:"center",gap:10}}>
        <NeonBadge icon="💊" c={c} size={40} glow={r.active}/>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:c.text}}>{r.name}</div>
          <div style={{fontSize:11,color:c.sec}}>🕐 {r.time} · {r.freq==="daily"?t.daily:r.freq==="twice"?t.twiceDaily:r.freq==="three"?t.threeDaily:t.weekly}</div></div>
        <button onClick={()=>saveRem(reminders.map(x=>x.id===r.id?{...x,active:!x.active}:x))} style={{padding:"5px 10px",borderRadius:10,border:`1px solid ${r.active?c.accentBorder:c.border}`,background:r.active?c.accentSoft:c.input,color:r.active?c.neon:c.ter,cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:F}}>{r.active?"✓":"⏸"}</button>
        <button onClick={()=>saveRem(reminders.filter(x=>x.id!==r.id))} style={{padding:"5px 8px",borderRadius:10,border:`1px solid ${c.dangerBorder}`,background:c.dangerSoft,color:c.danger,cursor:"pointer",fontSize:12}}>×</button>
      </GlowCard>)}
      {reminders.length===0&&<div style={{textAlign:"center",color:c.ter,padding:20}}>{t.noReminders}</div>}
    </>}

    {/* ═══ DOSSIER TAB ═══ */}
    {navTab==="dossier"&&<>
      <PhotoCard src={PHOTOS.doctor} c={c} style={{height:100}}>
        <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{t.dossierTitle}</div>
      </PhotoCard>
      {[{key:"allergies",icon:"🚫",label:t.dossierAllergies,variant:"danger"},
        {key:"meds",icon:"💊",label:t.dossierMeds,variant:"blue"},
        {key:"conditions",icon:"📋",label:t.dossierConditions,variant:"amber"}].map(s=>(
        <GlowCard key={s.key} c={c}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
            <span style={{fontSize:18}}>{s.icon}</span>
            <span style={{fontSize:14,fontWeight:800,color:c.text}}>{s.label}</span></div>
          {dossier[s.key].length>0?<div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
            {dossier[s.key].map((item,i)=><NeonPill key={i} c={c} variant={s.variant}>{item}
              <button onClick={()=>dossier.removeItem(s.key,i)} style={{background:"none",border:"none",color:"inherit",cursor:"pointer",fontSize:13,padding:"0 0 0 3px",opacity:.6}}>×</button>
            </NeonPill>)}</div>:<div style={{fontSize:12,color:c.ter,marginBottom:10}}>{t.dossierEmpty}</div>}
          <div style={{display:"flex",gap:8}}>
            <input type="text" value={dossierCat===s.key?dossierInput:""} onFocus={()=>setDossierCat(s.key)}
              onChange={e=>{setDossierCat(s.key);setDossierInput(e.target.value)}}
              onKeyDown={e=>{if(e.key==="Enter"&&dossierInput.trim()&&dossierCat===s.key){dossier.addItem(s.key,dossierInput);setDossierInput("")}}}
              placeholder={t.dossierPlaceholder} style={{...inp,flex:1,fontSize:13}}/>
            <button onClick={()=>{if(dossierInput.trim()&&dossierCat===s.key){dossier.addItem(s.key,dossierInput);setDossierInput("")}}}
              style={{padding:"10px 16px",background:c.gradient,border:"none",borderRadius:14,color:"#fff",cursor:"pointer",fontSize:12,fontWeight:700,flexShrink:0}}>{t.dossierAdd}</button>
          </div>
        </GlowCard>))}

      <div style={{fontSize:16,fontWeight:800,color:c.text,marginTop:8,marginBottom:12}}>{t.ordonnanceTitle}</div>
      <GlowCard c={c}>
        <input type="text" value={ordDoc} onChange={e=>setOrdDoc(e.target.value)} placeholder={t.ordonnanceDoctor} style={{...inp,marginBottom:8}}/>
        <input type="date" value={ordDate} onChange={e=>setOrdDate(e.target.value)} style={{...inp,marginBottom:8}}/>
        <input type="text" value={ordMeds} onChange={e=>setOrdMeds(e.target.value)} placeholder={t.ordonnanceMeds} style={{...inp,marginBottom:10}}/>
        <button onClick={()=>{if(!ordDoc.trim()||!ordDate)return;ordonnances.add({doctor:ordDoc,date:ordDate,meds:ordMeds});setOrdDoc("");setOrdDate("");setOrdMeds("")}} style={btnP}>{t.ordonnanceAdd}</button>
      </GlowCard>
      {ordonnances.list.map(o=><GlowCard key={o.id} c={c} style={{display:"flex",alignItems:"center",gap:10}}>
        <NeonBadge icon="📄" c={c} size={40}/>
        <div style={{flex:1}}><div style={{fontSize:14,fontWeight:700,color:c.text}}>{o.doctor}</div>
          <div style={{fontSize:11,color:c.sec}}>{new Date(o.date).toLocaleDateString("fr-FR")} · {o.meds}</div></div>
        <button onClick={()=>ordonnances.remove(o.id)} style={{padding:"5px 8px",borderRadius:10,border:`1px solid ${c.dangerBorder}`,background:c.dangerSoft,color:c.danger,cursor:"pointer",fontSize:12}}>×</button>
      </GlowCard>)}
      {ordonnances.list.length===0&&<div style={{textAlign:"center",color:c.ter,padding:16}}>{t.ordonnanceEmpty}</div>}
    </>}

    {/* ═══ PROFILE TAB ═══ */}
    {navTab==="profile"&&(auth.user?<>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{width:72,height:72,borderRadius:22,background:c.gradient,display:"inline-flex",alignItems:"center",justifyContent:"center",
          fontSize:32,color:"#fff",fontWeight:800,boxShadow:`0 12px 36px ${c.accentGlow}`}}>{(auth.user.name||"U")[0].toUpperCase()}</div>
        <div style={{fontSize:22,fontWeight:800,color:c.text,marginTop:12}}>{auth.user.name}</div>
        <div style={{fontSize:13,color:c.neon}}>{auth.user.email}</div>
      </div>
      <GlowCard c={c}>
        <div style={{fontSize:13,fontWeight:800,color:c.text,marginBottom:8}}>{t.apiKeyLabel}</div>
        <input type="password" value={apiK.key} onChange={e=>apiK.save(e.target.value)} placeholder={t.apiKeyPlaceholder}
          style={{...inp,fontSize:12,marginBottom:6}}/>
        <div style={{fontSize:11,color:apiK.hasKey?c.neon:c.sec,fontWeight:600}}>{apiK.hasKey?t.apiKeySet:t.apiKeyInfo}</div>
      </GlowCard>
      <button onClick={()=>{auth.logout();setNavTab("ai")}} style={{...btnP,background:`linear-gradient(135deg,${c.danger},#FF6E40)`,boxShadow:`0 4px 20px rgba(255,61,0,.2)`,marginTop:8}}>{t.logout}</button>
    </>:<div style={{textAlign:"center",padding:"40px 20px"}}>
      <PhotoCard src={PHOTOS.profile} c={c} style={{height:160,marginBottom:16}}>
        <div style={{fontSize:20,fontWeight:800,color:"#fff"}}>Mon compte</div>
      </PhotoCard>
      <button onClick={()=>{setScreen("auth");setAuthError("")}} style={btnP}>{t.login}</button>
    </div>)}

  </div>

  {/* ═══ NAV BAR ═══ */}
  <div style={{...navBar,overflowX:"auto",gap:0}}>
    {[{id:"ai",icon:"🩺",label:"IA"},{id:"search",icon:"🔍",label:t.scan},{id:"cpam",icon:"💰",label:"CPAM"},
      {id:"calendar",icon:"📅",label:"RDV"},{id:"nearby",icon:"📍",label:t.nearby||"Proxi"},
      {id:"interactions",icon:"⚠️",label:"Inter."},{id:"reminders",icon:"🔔",label:t.reminders},
      {id:"dossier",icon:"📋",label:"Dossier"},{id:"profile",icon:"👤",label:t.profile}]
      .map(n=><button key={n.id} onClick={()=>setNavTab(n.id)} style={navI(navTab===n.id)}>
        <span style={{fontSize:14}}>{n.icon}</span><span>{n.label}</span>
        {navTab===n.id&&<div style={{position:"absolute",top:-1,width:16,height:2,borderRadius:1,background:c.neon,boxShadow:`0 0 8px ${c.neon}`}}/>}
      </button>)}
  </div>

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
    @keyframes smDot{0%,100%{opacity:.2;transform:scale(.8)}50%{opacity:1;transform:scale(1.3)}}
    @keyframes smSh{0%{background-position:200% 0}100%{background-position:-200% 0}}
    @keyframes smSc{0%,100%{top:15%}50%{top:80%}}
    @keyframes smVoicePulse{0%{transform:scale(1);opacity:.6}50%{transform:scale(1.12);opacity:1}100%{transform:scale(1);opacity:.6}}
    @keyframes smBar{0%{height:4px}100%{height:18px}}
    @keyframes smPulseBtn{0%,100%{opacity:1}50%{opacity:.5}}
    @keyframes smWave{0%{transform:scaleY(.4)}50%{transform:scaleY(1)}100%{transform:scaleY(.4)}}
    *::-webkit-scrollbar{width:4px;height:4px}*::-webkit-scrollbar-track{background:transparent}*::-webkit-scrollbar-thumb{background:${c.border};border-radius:4px}
  `}</style>
  </div>);
}
