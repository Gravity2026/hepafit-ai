// ==========================================
// HEPAFIT AI - APLICACIÓN DE SALUD HEPÁTICA
// ==========================================

// --- STATE MANAGEMENT ---
const userState = {
    user: null, // Logged in user info
    water: 0.8, // Liters initially
    healthScore: 70, // 0 to 100
    completedHabitsCount: 1,
    currentBudget: 'basic', // 'basic' | 'premium'
    lang: 'es', // 'es' | 'en'
    
    // Weekly progress scores (Monday to Sunday)
    weeklyScores: [62, 65, 68, 72, 70, 74, 75],
    
    // Quiz state
    quizCurrentQuestion: 0,
    answers: [],
    
    // Habits state
    activeHabitIndex: 0,
    timerInterval: null,
    timerSecondsLeft: 300,
    timerRunning: false,

    // Alert timestamps
    lastWaterTime: Date.now(),
    lastHabitTime: Date.now()
};

// --- MULTI-LANGUAGE DICTIONARY (i18n) ---
const i18n = {
    es: {
        // Static DOM elements
        auth_subtitle: "Ingresa tus datos de cuenta para continuar.",
        auth_subtitle_reg: "Crea tu cuenta de salud para guardar tu progreso de forma privada.",
        btn_login: "Iniciar Sesión",
        btn_register: "Crear Cuenta",
        link_to_register: "¿No tienes cuenta? Regístrate gratis",
        link_to_login: "¿Ya tienes cuenta? Inicia sesión",
        label_username: "Usuario",
        label_password: "Contraseña",
        label_fullname: "Nombre Completo",
        welcome_prefix: "Bienvenido, ",
        welcome_name_default: "Usuario",
        welcome_subtitle: "Monitorea tu salud hepática y optimiza tu digestión.",
        score_label: "Score Hepático",
        score_level_label: "Tu nivel es: ",
        tip_title: "Consejo del Día",
        next_tip_btn: "Siguiente consejo →",
        chart_title: "Progreso Semanal (Score)",
        actions_title: "Acciones Rápidas",
        action_water: "+250ml Agua",
        action_water_sub: "Hidratación clave",
        action_habit: "Micro-Hábito",
        action_habit_sub: "Pausa de 5 mins",
        tab_dashboard: "Dashboard",
        tab_test: "Test Hepático",
        tab_food: "Alimentación",
        tab_habits: "Hábitos",
        tab_resources: "Recursos",
        test_intro_title: "Evaluador de Riesgo Hepático",
        test_intro_desc: "Un cuestionario clínico abreviado basado en estilo de vida, nutrición y factores metabólicos comunes.",
        test_prev_btn: "Atrás",
        test_next_btn: "Siguiente",
        test_results_title: "Tu nivel de riesgo estimado",
        test_recs_title: "Recomendaciones clave para ti:",
        test_retry_btn: "Volver a realizar el test",
        food_intro_title: "Guía Nutricional Inteligente",
        food_intro_desc: "Diseñada específicamente para la salud del hígado, adaptada a tu presupuesto.",
        food_toggle_label: "Ver opciones para presupuesto:",
        food_toggle_basic: "🪙 Básico / Accesible",
        food_toggle_premium: "✨ Premium / Completo",
        food_avoid_title: "🚫 Alimentos a Evitar (Enemigos del Hígado)",
        food_avoid_desc: "Cualquiera que sea tu presupuesto, reducir estos elementos marcará una diferencia radical:",
        habits_intro_title: "Micro-Entrenamientos de 5 Minutos",
        habits_intro_desc: "¿Sin tiempo para el gimnasio? Estos micro-estímulos activan la sensibilidad a la insulina y ayudan a depurar grasa visceral.",
        habits_timer_reset: "Reiniciar",
        habits_timer_start: "Iniciar",
        habits_timer_pause: "Pausar",
        habits_timer_resume: "Reanudar",
        habits_list_title: "Selecciona tu Rutina de hoy",
        resources_intro_title: "Biblioteca & Multimedia",
        resources_intro_desc: "Accede a videos prácticos de movilidad, música motivadora para entrenar y guías oficiales de salud hepática sin costo.",
        music_player_title: "🎵 Gym Power Player",
        video_section_title: "Videos de Ejercicios en Casa",
        library_section_title: "Biblioteca Digital Hepática",
        recipe_modal_ing: "Ingredientes",
        recipe_modal_prep: "Preparación Paso a Paso",
        book_modal_sum: "Resumen Clínico",
        book_modal_points: "Puntos Clave",
        book_modal_btn: "📥 Leer / Descargar PDF Oficial",
        onb_title: "¡Te damos la bienvenida!",
        onb_subtitle: "Descubre cómo HepaFit AI te ayuda a cuidar tu salud en 3 pasos simples.",
        onb_step1_title: "1. Haz tu Test Inicial",
        onb_step1_desc: "Ve a la pestaña Test Hepático. Responde 5 preguntas de tu rutina diaria para estimar tu nivel de riesgo y obtener recomendaciones.",
        onb_step2_title: "2. Elige tu Alimentación",
        onb_step2_desc: "En la sección Alimentación, cambia entre presupuesto Básico (barato) o Premium. Toca cualquier alimento para ver su preparación paso a paso.",
        onb_step3_title: "3. Micro-Hábitos de 5 Mins",
        onb_step3_desc: "¿Sin tiempo para el gym? Ve a Hábitos, elige un estiramiento de escritorio y activa el cronómetro para ganar puntos de salud hepática hoy.",
        onb_next: "Siguiente",
        onb_prev: "Atrás",
        onb_done: "¡Entendido!",
        toggle_mode_quiz: "Cuestionario Diario",
        toggle_mode_doc: "Doc AI (Escáner)",
        doc_drop_title: "Arrastra tu examen aquí o presiona",
        doc_drop_sub: "Sube una foto o captura de tu análisis de sangre, ecografía o perfil lipídico.",
        doc_scanning_title: "Doc AI Analizando Examen...",
        doc_scanning_desc: "Reconociendo términos médicos y comparando rangos clínicos de referencia.",
        doc_report_analyzed_badge: "Análisis Completo",
        doc_report_title: "Reporte Clínico Doc AI",
        doc_report_summary_title: "Resumen de Lectura",
        doc_report_glossary_title: "Conceptos Técnicos Explicados",
        doc_scan_another_btn: "Escanear otro examen",
        demo_access_label: "Acceso Demo: Usuario: <strong>demo</strong> | Clave: <strong>123456</strong>",
        status_stable: "Hígado Estable",
        water_metric_title: "Agua",
        coach_title: "HepaCoach AI (Alertas Estrictas)",
        coach_desc: "Recibe avisos para tomar agua y moverte en el escritorio de forma estricta. ¡Haz clic para activar notificaciones!",
        btn_enable_notifications: "🔔 Activar Alertas Clínicas",
        btn_notifications_active: "✅ Alertas Activas",
        habits_metric_title: "Micro-hábitos",
        vid_title_1: "5 Mins de Estiramiento de Oficina",
        vid_desc_1: "Rutina guiada de baja intensidad ideal para relajar cuello, espalda y hombros durante el trabajo.",
        vid_title_2: "Activación Sóleo y Cardio Suave",
        vid_desc_2: "Micro-movilidad enfocada en quemar glucosa rápidamente y favorecer la depuración del hígado.",
        book_title_1: "Guía del Cuidado Hepático",
        book_author_1: "OMS & Salud Pública",
        book_desc_1: "Manual oficial abreviado sobre la acumulación grasa y cómo revertirla paso a paso.",
        book_title_2: "Alimentos del Hígado",
        book_author_2: "Guía Práctica",
        book_desc_2: "Recetario básico de bolsillo con ingredientes de bajo costo y alto impacto celular.",
        book_title_3: "Hábitos en 5 Minutos",
        book_author_3: "Estilo de Vida",
        book_desc_3: "Cómo construir constancia metabólica aunque no tengas tiempo de ir al gimnasio."
    },
    en: {
        auth_subtitle: "Enter your credentials to continue.",
        auth_subtitle_reg: "Create your health account to save your progress privately.",
        btn_login: "Log In",
        btn_register: "Create Account",
        link_to_register: "Don't have an account? Sign up free",
        link_to_login: "Already have an account? Log in",
        label_username: "Username",
        label_password: "Password",
        label_fullname: "Full Name",
        welcome_prefix: "Welcome, ",
        welcome_name_default: "User",
        welcome_subtitle: "Monitor your liver health and optimize digestion.",
        score_label: "Liver Score",
        score_level_label: "Your level is: ",
        tip_title: "Tip of the Day",
        next_tip_btn: "Next tip →",
        chart_title: "Weekly Progress (Score)",
        actions_title: "Quick Actions",
        action_water: "+250ml Water",
        action_water_sub: "Key Hydration",
        action_habit: "Micro-Habit",
        action_habit_sub: "5 min break",
        tab_dashboard: "Dashboard",
        tab_test: "Liver Quiz",
        tab_food: "Nutrition",
        tab_habits: "Habits",
        tab_resources: "Resources",
        test_intro_title: "Liver Risk Evaluator",
        test_intro_desc: "An abbreviated clinical questionnaire based on lifestyle, nutrition, and common metabolic factors.",
        test_prev_btn: "Back",
        test_next_btn: "Next",
        test_results_title: "Your Estimated Risk Level",
        test_recs_title: "Key recommendations for you:",
        test_retry_btn: "Retake the test",
        food_intro_title: "Smart Nutrition Guide",
        food_intro_desc: "Designed specifically for liver health, tailored to your budget.",
        food_toggle_label: "Select your budget option:",
        food_toggle_basic: "🪙 Basic / Affordable",
        food_toggle_premium: "✨ Premium / Complete",
        food_avoid_title: "🚫 Foods to Avoid (Liver Enemies)",
        food_avoid_desc: "Whatever your budget, reducing these items will make a radical difference:",
        habits_intro_title: "5-Minute Micro-Workouts",
        habits_intro_desc: "No time for the gym? These micro-stimuli trigger insulin sensitivity and help clear visceral fat.",
        habits_timer_reset: "Reset",
        habits_timer_start: "Start",
        habits_timer_pause: "Pause",
        habits_timer_resume: "Resume",
        habits_list_title: "Select your Routine for today",
        resources_intro_title: "Library & Multimedia",
        resources_intro_desc: "Access practical mobility videos, motivational training music, and official liver health guides for free.",
        music_player_title: "🎵 Gym Power Player",
        video_section_title: "Home Workout Videos",
        library_section_title: "Liver Digital Library",
        recipe_modal_ing: "Ingredients",
        recipe_modal_prep: "Step-by-Step Preparation",
        book_modal_sum: "Clinical Summary",
        book_modal_points: "Key Points",
        book_modal_btn: "📥 Read / Download Official PDF",
        onb_title: "Welcome aboard!",
        onb_subtitle: "Discover how HepaFit AI helps you care for your health in 3 simple steps.",
        onb_step1_title: "1. Take your Initial Quiz",
        onb_step1_desc: "Go to the Liver Quiz tab. Answer 5 quick questions about your daily routine to calculate risk and get clinical tips.",
        onb_step2_title: "2. Personalize your Meals",
        onb_step2_desc: "In the Nutrition section, switch between Basic (low budget) or Premium. Click any food card to view full recipe steps.",
        onb_step3_title: "3. 5-Minute Micro-Habits",
        onb_step3_desc: "No gym time? Go to Habits, select a desk stretch and start the timer to gain liver health score points today.",
        onb_next: "Next",
        onb_prev: "Back",
        onb_done: "Got it!",
        toggle_mode_quiz: "Daily Quiz",
        toggle_mode_doc: "Doc AI (Scanner)",
        doc_drop_title: "Drag your exam here or tap",
        doc_drop_sub: "Upload a photo or screenshot of your blood test, ultrasound, or lipid profile.",
        doc_scanning_title: "Doc AI Analyzing Exam...",
        doc_scanning_desc: "Recognizing medical terms and comparing clinical reference ranges.",
        doc_report_analyzed_badge: "Analysis Complete",
        doc_report_title: "Doc AI Clinical Report",
        doc_report_summary_title: "Reading Summary",
        doc_report_glossary_title: "Technical Concepts Explained",
        doc_scan_another_btn: "Scan another exam",
        demo_access_label: "Demo Access: Username: <strong>demo</strong> | Password: <strong>123456</strong>",
        status_stable: "Stable Liver",
        water_metric_title: "Water",
        coach_title: "HepaCoach AI (Strict Alerts)",
        coach_desc: "Receive push reminders to drink water and move at your desk. Click to enable desktop notifications!",
        btn_enable_notifications: "🔔 Enable Clinical Alerts",
        btn_notifications_active: "✅ Alerts Active",
        habits_metric_title: "Micro-habits",
        vid_title_1: "5 Mins Desk Stretching",
        vid_desc_1: "Guided low-intensity routine ideal to relax neck, back and shoulders during work.",
        vid_title_2: "Soleus Activation & Easy Cardio",
        vid_desc_2: "Micro-mobility focused on burning glucose rapidly and supporting liver cleansing.",
        book_title_1: "Liver Care Guide",
        book_author_1: "WHO & Public Health",
        book_desc_1: "Official brief manual on fat accumulation and how to reverse it step by step.",
        book_title_2: "Foods for the Liver",
        book_author_2: "Practical Guide",
        book_desc_2: "Basic pocket recipe book with low-cost and high cellular impact ingredients.",
        book_title_3: "5-Minute Habits",
        book_author_3: "Healthy Lifestyle",
        book_desc_3: "How to build metabolic consistency even if you don't have time for the gym."
    }
};

// --- DATA: FOODS & RECIPES DATABASE ---
const foodDatabase = {
    es: {
        basic: [
            { id: "avena", name: "Avena Integral", icon: "🌾", benefit: "Fibra soluble (Beta-glucanos)", desc: "Excelente para absorber grasas en el intestino antes de llegar al hígado.", difficulty: "Fácil", ingredients: ["1/2 taza de avena integral", "1 taza de agua o leche descremada", "Canela en polvo", "Media manzana verde picada"], steps: ["Calienta el agua en una olla pequeña.", "Añade la avena y baja el fuego a mínimo.", "Cocina por 5 minutos revolviendo suavemente.", "Sirve y añade canela y manzana verde."] },
            { id: "ajo", name: "Ajo y Cebolla", icon: "🧄", benefit: "Compuestos de Azufre", desc: "Activan las enzimas hepáticas que se encargan de limpiar las toxinas del cuerpo.", difficulty: "Muy Fácil", ingredients: ["1 diente de ajo crudo", "1 cucharadita de aceite de oliva"], steps: ["Pica finamente el ajo crudo.", "Déjalo reposar por 10 minutos para activar la alicina.", "Consúmelo directamente con el aceite de oliva."] },
            { id: "te_verde", name: "Té Verde", icon: "🍵", benefit: "Antioxidantes (Catequinas)", desc: "Disminuye la acumulación de grasas y desinflama los hepatocitos.", difficulty: "Fácil", ingredients: ["1 bolsita de té verde", "1 taza de agua a 80°C", "Gotas de limón"], steps: ["Calienta agua hasta antes de hervir.", "Vierte en la taza con la bolsa de té verde.", "Tapa y deja reposar 3 minutos.", "Retira la bolsa y agrega el limón."] }
        ],
        premium: [
            { id: "cardo", name: "Cardo Mariano", icon: "💊", benefit: "Silimarina Activa", desc: "El protector celular hepático más potente que ayuda a regenerar el tejido.", difficulty: "Fácil", ingredients: ["1 cucharadita de semillas de cardo mariano", "1 taza de agua", "1 rodaja de jengibre"], steps: ["Machaca ligeramente las semillas.", "Hierve el agua con la rodaja de jengibre.", "Añade las semillas, apaga el fuego y tapa.", "Deja reposar por 10 minutos y cuela."] },
            { id: "salmon", name: "Salmón con Eneldo", icon: "🐟", benefit: "Omega 3 (EPA y DHA)", desc: "Desinflama las células hepáticas y evita la acumulación de triglicéridos.", difficulty: "Media", ingredients: ["1 filete de salmón (150g)", "1 cdta de aceite de oliva virgen extra", "Eneldo, sal y limón"], steps: ["Sazona el salmón con sal, pimienta y eneldo.", "Calienta una sartén con el aceite de oliva.", "Cocina 4 minutos del lado de la piel, voltea y cocina 3 minutos más.", "Sirve con rodajas de limón."] }
        ]
    },
    en: {
        basic: [
            { id: "avena", name: "Whole Oats", icon: "🌾", benefit: "Soluble Fiber (Beta-glucans)", desc: "Excellent for absorbing fats in the gut before they reach the liver.", difficulty: "Easy", ingredients: ["1/2 cup of whole oats", "1 cup of water or skim milk", "Cinnamon powder", "Half chopped green apple"], steps: ["Heat water in a small pot.", "Add oats and reduce heat to minimum.", "Cook for 5 minutes, stirring gently.", "Serve and top with cinnamon and green apple."] },
            { id: "ajo", name: "Garlic & Onion", icon: "🧄", benefit: "Sulfur Compounds", desc: "Activate liver enzymes responsible for clearing toxins from the body.", difficulty: "Very Easy", ingredients: ["1 raw garlic clove", "1 teaspoon of olive oil"], steps: ["Finely chop raw garlic.", "Let it rest for 10 minutes to activate allicin.", "Consume directly with olive oil."] }
        ],
        premium: [
            { id: "cardo", name: "Milk Thistle", icon: "💊", benefit: "Active Silymarin", desc: "The most potent liver cell protector that helps regenerate damaged tissues.", difficulty: "Easy", ingredients: ["1 tsp of crushed milk thistle seeds", "1 cup of water", "1 slice of ginger"], steps: ["Crush seeds lightly to release active ingredients.", "Boil water with the ginger slice.", "Add seeds, turn off heat, and cover.", "Let steep for 10 minutes and strain."] },
            { id: "salmon", name: "Dill Seared Salmon", icon: "🐟", benefit: "Omega 3 (EPA & DHA)", desc: "Reduces liver inflammation and blocks triglyceride buildup.", difficulty: "Medium", ingredients: ["1 salmon fillet (150g)", "1 tsp extra virgin olive oil", "Dill, salt, and lemon"], steps: ["Season salmon with salt, pepper, and dill.", "Heat pan with olive oil over medium-high heat.", "Cook 4 minutes skin-side down, flip and cook 3 minutes more.", "Serve with fresh lemon slices."] }
        ]
    }
};

// --- DATA: CLINICAL TIPS ---
const dailyTips = {
    es: [
        { title: "El ajo ayuda a activar las enzimas del hígado", desc: "Contiene selenio y alicina, dos potentes compuestos que ayudan a limpiar el hígado de manera natural.", category: "💡 Nutrición" },
        { title: "El café es un protector hepático comprobado", desc: "Consumir 2 tazas al día (sin azúcar ni cremas) disminuye el riesgo de acumulación de grasa visceral.", category: "☕ Ciencia" }
    ],
    en: [
        { title: "Garlic helps activate liver enzymes", desc: "Contains selenium and alicin, two powerful compounds that help flush liver toxins naturally.", category: "💡 Nutrition" },
        { title: "Coffee is a proven liver protector", desc: "Drinking 2 cups daily (without sugar or creamers) decreases risk of visceral fat accumulation.", category: "☕ Science" }
    ]
};
let currentTipIndex = 0;

// --- DATA: LIVER HEALTH QUIZ ---
const quizQuestions = {
    es: [
        { question: "¿Qué tan frecuente es tu consumo de azúcar añadida, gaseosas o panificados?", options: [{ text: "Casi nunca, prefiero agua e integrales", score: 0 }, { text: "Moderado (2 a 3 veces por semana)", score: 10 }, { text: "Alto (casi a diario)", score: 25 }] },
        { question: "¿Cuál es tu nivel de actividad física diaria activa?", options: [{ text: "Estoy sentado todo el día", score: 20 }, { text: "Tengo pausas activas o camino (moderado)", score: 8 }, { text: "Hago ejercicio regular", score: 0 }] }
    ],
    en: [
        { question: "How frequent is your consumption of added sugars, sodas, or pastries?", options: [{ text: "Almost never, I prefer water and whole foods", score: 0 }, { text: "Moderate (2 to 3 times a week)", score: 10 }, { text: "High (almost daily)", score: 25 }] },
        { question: "What is your daily active physical activity level?", options: [{ text: "I sit all day and don't exercise", score: 20 }, { text: "I have active breaks or walk (moderate)", score: 8 }, { text: "I exercise regularly", score: 0 }] }
    ]
};

// --- DATA: HABITS TIMER LIST ---
const habitsList = {
    es: [
        { name: "Elevación de Talones (Sóleo)", desc: "Sentado o de pie, levanta los talones repetidamente. Activa el músculo sóleo que consume glucosa rápido.", duration: 300, points: 5 },
        { name: "Respiración Diafragmática", desc: "Inhala profundo expandiendo el abdomen. Reduce el cortisol que acumula grasa abdominal.", duration: 180, points: 4 }
    ],
    en: [
        { name: "Calf Raises (Soleus)", desc: "Sitting or standing, lift heels repeatedly. Activates the soleus muscle to clear glucose fast.", duration: 300, points: 5 },
        { name: "Diaphragmatic Breathing", desc: "Inhale deeply expanding the abdomen. Helps reduce stress cortisol that stores abdominal fat.", duration: 180, points: 4 }
    ]
};

// --- SYSTEM INITIALIZE & CHECK ---
document.addEventListener("DOMContentLoaded", () => {
    checkSession();
    setupDashboardGradient();
    initDocDropzone();
});

function setupDashboardGradient() {
    if (!document.getElementById("score-gradient")) {
        const svg = document.querySelector(".radial-svg");
        if (svg) {
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            defs.innerHTML = `
                <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#34d399" />
                    <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
            `;
            svg.appendChild(defs);
        }
    }
}

// --- AUTH LOGIC ---
function checkSession() {
    const users = JSON.parse(localStorage.getItem("hepaUsersList") || "{}");
    if (!users["demo"]) {
        users["demo"] = { name: "Usuario Demo", username: "demo", password: "123456" };
        localStorage.setItem("hepaUsersList", JSON.stringify(users));
    }

    const session = localStorage.getItem("hepaUser");
    if (session) {
        userState.user = JSON.parse(session);
        document.getElementById("auth-screen").classList.add("d-none");
        document.getElementById("main-app").classList.remove("d-none");
        
        document.getElementById("user-display-name").textContent = userState.user.name;
        document.getElementById("welcome-name").textContent = userState.user.name;
        
        // Load default language from localStorage
        const savedLang = localStorage.getItem("hepaLang") || "es";
        changeLanguage(savedLang);

        // Init audio player after login (DOM is now visible)
        initAudioPlayer();

        // Start Coach Alert scheduler only once
        if (!userState._alertSchedulerStarted) {
            userState._alertSchedulerStarted = true;
            userState.lastWaterTime = Date.now();
            userState.lastHabitTime = Date.now();
            setInterval(runCoachAlertCheck, 40000);
        }

        // Check Onboarding Modal
        if (!localStorage.getItem("hepaOnboarded_" + userState.user.username)) {
            showOnboardingTour();
        }
    } else {
        document.getElementById("auth-screen").classList.remove("d-none");
        document.getElementById("main-app").classList.add("d-none");
        
        document.getElementById("login-username").value = "demo";
        document.getElementById("login-password").value = "123456";
    }
}

// --- MULTI-LANGUAGE ENGINE (i18n) ---
function changeLanguage(lang) {
    userState.lang = lang;
    localStorage.setItem("hepaLang", lang);
    document.getElementById("lang-select").value = lang;
    
    const dict = i18n[lang];
    
    // Robustly translate all DOM elements with [data-i18n]
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (dict[key]) {
            if (dict[key].includes("<strong") || dict[key].includes("<span")) {
                element.innerHTML = dict[key];
            } else {
                element.textContent = dict[key];
            }
        }
    });
    
    // Dynamic welcome user info
    if (userState.user) {
        document.getElementById("user-display-name").textContent = userState.user.name;
        document.getElementById("welcome-name").textContent = userState.user.name;
    }
    
    // Refresh list content in target language
    updateDashboardUI();
    renderWeeklyChart();
    renderFoodGrid();
    renderHabitsSelector();
    loadQuizQuestion();
    nextTip();
}

function toggleAuthForms(showLogin) {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const subtitle = document.getElementById("auth-subtitle");
    const dict = i18n[userState.lang];
    
    if (showLogin) {
        loginForm.classList.remove("d-none");
        registerForm.classList.add("d-none");
        subtitle.textContent = dict.auth_subtitle;
    } else {
        loginForm.classList.add("d-none");
        registerForm.classList.remove("d-none");
        subtitle.textContent = dict.auth_subtitle_reg;
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById("reg-name").value.trim();
    const username = document.getElementById("reg-username").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;
    
    if (!name || !username || !password) return;
    const users = JSON.parse(localStorage.getItem("hepaUsersList") || "{}");
    
    if (users[username]) {
        alert(userState.lang === 'es' ? "El usuario ya existe." : "Username already exists.");
        return;
    }
    
    const newUser = { name, username, password };
    users[username] = newUser;
    localStorage.setItem("hepaUsersList", JSON.stringify(users));
    localStorage.setItem("hepaUser", JSON.stringify(newUser));
    checkSession();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    
    const users = JSON.parse(localStorage.getItem("hepaUsersList") || "{}");
    const user = users[username];
    
    if (user && user.password === password) {
        localStorage.setItem("hepaUser", JSON.stringify(user));
        checkSession();
    } else {
        alert(userState.lang === 'es' ? "Usuario o clave incorrectos." : "Invalid username or password.");
    }
}

function handleLogout() {
    localStorage.removeItem("hepaUser");
    if (userState.timerRunning) clearInterval(userState.timerInterval);
    checkSession();
}

// --- ONBOARDING TOUR LOGIC ---
let onboardingStep = 1;

function showOnboardingTour() {
    onboardingStep = 1;
    updateOnboardingUI();
    document.getElementById("onboarding-modal").classList.remove("d-none");
}

function updateOnboardingUI() {
    document.getElementById("onb-step-1").classList.add("d-none");
    document.getElementById("onb-step-2").classList.add("d-none");
    document.getElementById("onb-step-3").classList.add("d-none");
    
    document.getElementById("onb-step-" + onboardingStep).classList.remove("d-none");
    
    const prevBtn = document.getElementById("btn-onb-prev");
    const nextBtn = document.getElementById("btn-onb-next");
    const dict = i18n[userState.lang];
    
    prevBtn.style.visibility = onboardingStep === 1 ? "hidden" : "visible";
    nextBtn.textContent = onboardingStep === 3 ? dict.onb_done : dict.onb_next;
}

function nextOnboardingStep() {
    if (onboardingStep < 3) {
        onboardingStep++;
        updateOnboardingUI();
    } else {
        document.getElementById("onboarding-modal").classList.add("d-none");
        localStorage.setItem("hepaOnboarded_" + userState.user.username, "true");
    }
}

function prevOnboardingStep() {
    if (onboardingStep > 1) {
        onboardingStep--;
        updateOnboardingUI();
    }
}

// --- TABS NAVIGATION ---
function switchTab(tabId) {
    document.querySelectorAll(".tab-panel").forEach(panel => panel.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));

    const targetPanel = document.getElementById(`tab-${tabId}`);
    if (targetPanel) targetPanel.classList.add("active");

    const targetNav = document.getElementById(`nav-${tabId}`);
    if (targetNav) targetNav.classList.add("active");

    document.querySelector(".app-content").scrollTop = 0;
}

// --- DASHBOARD ACTIONS & CHARTS ---
function updateDashboardUI() {
    document.getElementById("water-val").textContent = `${userState.water.toFixed(2)} L`;
    document.getElementById("habits-val").textContent = `${userState.completedHabitsCount}/4`;
    document.getElementById("health-score").textContent = userState.healthScore;
    
    const gradeSpan = document.getElementById("health-score-grade");
    const tipSpan = document.getElementById("health-score-tip");
    const radial = document.getElementById("radial-progress-bar");
    const dict = i18n[userState.lang];
    
    if (radial) {
        radial.parentNode.parentNode.setAttribute("style", `--percent: ${userState.healthScore}`);
    }

    if (userState.healthScore >= 80) {
        gradeSpan.textContent = userState.lang === 'es' ? "Excelente" : "Excellent";
        gradeSpan.className = "text-green";
        tipSpan.textContent = userState.lang === 'es' ? "Tu hígado está funcionando en condiciones ideales." : "Your liver is working in ideal conditions.";
        updateGlobalBadge(userState.lang === 'es' ? "Salud Hepática Óptima" : "Optimal Liver Health", "green");
    } else if (userState.healthScore >= 50) {
        gradeSpan.textContent = userState.lang === 'es' ? "Estable" : "Stable";
        gradeSpan.className = "text-amber";
        tipSpan.textContent = userState.lang === 'es' ? "Buen estado general, con margen de mejora." : "Good general state, with room to improve.";
        updateGlobalBadge(userState.lang === 'es' ? "Hígado Estable" : "Stable Liver", "amber");
    } else {
        gradeSpan.textContent = userState.lang === 'es' ? "Atención requerida" : "Attention needed";
        gradeSpan.className = "text-red";
        tipSpan.textContent = userState.lang === 'es' ? "Reduce azúcares y haz micro-hábitos hoy." : "Reduce sugars and do micro-habits today.";
        updateGlobalBadge(userState.lang === 'es' ? "Riesgo Detectado" : "Risk Detected", "red");
    }
}

function updateGlobalBadge(text, colorClass) {
    const badge = document.getElementById("global-status-badge");
    const textEl = document.getElementById("global-status-text");
    if (!badge || !textEl) return;
    
    textEl.textContent = text;
    badge.className = "status-badge";
    if (colorClass === "green") {
        badge.style.borderColor = "rgba(16, 185, 129, 0.2)";
        badge.style.background = "rgba(16, 185, 129, 0.1)";
        badge.style.color = "var(--text-success)";
    } else if (colorClass === "amber") {
        badge.style.borderColor = "rgba(245, 158, 11, 0.2)";
        badge.style.background = "rgba(245, 158, 11, 0.1)";
        badge.style.color = "var(--text-warning)";
    } else {
        badge.style.borderColor = "rgba(239, 68, 68, 0.2)";
        badge.style.background = "rgba(239, 68, 68, 0.1)";
        badge.style.color = "var(--text-danger)";
    }
}

function renderWeeklyChart() {
    const chartContainer = document.getElementById("weekly-chart");
    if (!chartContainer) return;
    
    const daysEs = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
    const daysEn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const days = userState.lang === 'es' ? daysEs : daysEn;
    const currentDayIdx = 2; // Simulated Wednesday
    
    userState.weeklyScores[currentDayIdx] = userState.healthScore;
    
    chartContainer.innerHTML = days.map((day, idx) => {
        const score = userState.weeklyScores[idx];
        const isActive = idx === currentDayIdx;
        return `
            <div class="chart-bar">
                <div class="bar-fill ${isActive ? 'active' : ''}" style="height: ${score}%">
                    <span class="bar-val">${score}</span>
                </div>
                <span class="bar-label">${day}</span>
            </div>
        `;
    }).join('');
}

function addWater() {
    if (userState.water < 3.0) {
        userState.water += 0.25;
        userState.lastWaterTime = Date.now();
        if (userState.healthScore < 100) userState.healthScore = Math.min(100, userState.healthScore + 2);
        updateDashboardUI();
        renderWeeklyChart();
    }
}

function nextTip() {
    const tips = dailyTips[userState.lang];
    currentTipIndex = (currentTipIndex + 1) % tips.length;
    const tip = tips[currentTipIndex];
    const container = document.getElementById("daily-tip-container");
    if (!container) return;
    
    container.style.opacity = "0";
    setTimeout(() => {
        document.getElementById("daily-tip-title").textContent = tip.title;
        document.getElementById("daily-tip-desc").textContent = tip.desc;
        container.querySelector(".tip-category").textContent = tip.category;
        container.style.opacity = "1";
    }, 200);
}

// --- EVALUADOR (TEST) LOGIC ---
function loadQuizQuestion() {
    const wizard = document.getElementById("quiz-question-container");
    if (!wizard) return;

    const questions = quizQuestions[userState.lang];
    const currentQ = questions[userState.quizCurrentQuestion];
    const totalQ = questions.length;
    const progressPercent = ((userState.quizCurrentQuestion) / totalQ) * 100;
    
    document.getElementById("quiz-progress").style.width = `${progressPercent}%`;

    let optionsHtml = '';
    currentQ.options.forEach((opt, idx) => {
        const isSelected = userState.answers[userState.quizCurrentQuestion] === idx;
        optionsHtml += `
            <div class="option-card ${isSelected ? 'selected' : ''}" onclick="selectQuizOption(${idx})">
                <div class="option-check"></div>
                <div class="option-text">${opt.text}</div>
            </div>
        `;
    });

    wizard.innerHTML = `
        <div class="quiz-question">
            <span>${userState.lang === 'es' ? 'Pregunta' : 'Question'} ${userState.quizCurrentQuestion + 1} ${userState.lang === 'es' ? 'de' : 'of'} ${totalQ}</span>
            <h3>${currentQ.question}</h3>
            <div class="quiz-options">
                ${optionsHtml}
            </div>
        </div>
    `;

    document.getElementById("quiz-prev-btn").disabled = userState.quizCurrentQuestion === 0;
    document.getElementById("quiz-next-btn").textContent = 
        userState.quizCurrentQuestion === totalQ - 1 ? (userState.lang === 'es' ? "Ver Resultados" : "Get Results") : (userState.lang === 'es' ? "Siguiente" : "Next");
}

function selectQuizOption(optionIdx) {
    userState.answers[userState.quizCurrentQuestion] = optionIdx;
    loadQuizQuestion();
}

function nextQuestion() {
    const questions = quizQuestions[userState.lang];
    if (userState.answers[userState.quizCurrentQuestion] === undefined) {
        alert(userState.lang === 'es' ? "Por favor selecciona una respuesta." : "Please select an answer.");
        return;
    }

    if (userState.quizCurrentQuestion < questions.length - 1) {
        userState.quizCurrentQuestion++;
        loadQuizQuestion();
    } else {
        calculateQuizResults();
    }
}

function prevQuestion() {
    if (userState.quizCurrentQuestion > 0) {
        userState.quizCurrentQuestion--;
        loadQuizQuestion();
    }
}

function calculateQuizResults() {
    let rawTotalScore = 0;
    const questions = quizQuestions[userState.lang];
    userState.answers.forEach((ansIdx, qIdx) => {
        rawTotalScore += questions[qIdx].options[ansIdx].score;
    });

    let riskLevel = 'bajo';
    let summary = '';
    let recommendations = [];

    if (userState.lang === 'es') {
        if (rawTotalScore <= 20) {
            riskLevel = 'bajo';
            summary = "Tu perfil indica hábitos saludables y un riesgo muy bajo de acumulación de grasa hepática.";
            recommendations = ["Sigue bebiendo agua.", "Mantén los hábitos activos en el escritorio."];
        } else {
            riskLevel = 'moderado';
            summary = "Presentas factores de riesgo moderados con posible sobrecarga digestiva.";
            recommendations = ["Haz pausas activas.", "Reduce azúcares en tus infusiones."];
        }
    } else {
        if (rawTotalScore <= 20) {
            riskLevel = 'bajo';
            summary = "Your profile shows healthy habits and very low risk of fat accumulation.";
            recommendations = ["Keep drinking water.", "Keep up the active desk habits."];
        } else {
            riskLevel = 'moderado';
            summary = "You have moderate risk factors with mild metabolic overload.";
            recommendations = ["Take micro active breaks.", "Reduce processed sugars."];
        }
    }

    document.getElementById("test-wizard").classList.add("d-none");
    const resultsContainer = document.getElementById("test-results");
    resultsContainer.classList.remove("d-none");

    const badge = document.getElementById("results-badge-level");
    badge.textContent = riskLevel.toUpperCase();
    badge.className = `results-badge ${riskLevel}`;

    const fillBar = document.getElementById("results-bar-fill");
    fillBar.className = `progress-bar-fill ${riskLevel}`;
    fillBar.style.width = `${Math.min(100, Math.max(15, (rawTotalScore / 50) * 100))}%`;

    document.getElementById("results-summary").textContent = summary;
    document.getElementById("results-recommendations").innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join('');

    userState.healthScore = Math.max(40, 95 - rawTotalScore);
    updateDashboardUI();
    renderWeeklyChart();
}

function resetQuiz() {
    userState.quizCurrentQuestion = 0;
    userState.answers = [];
    document.getElementById("test-results").classList.add("d-none");
    document.getElementById("test-wizard").classList.remove("d-none");
    loadQuizQuestion();
}

// --- ALIMENTACION BUDGET & RECIPES ---
function setBudget(budgetType) {
    userState.currentBudget = budgetType;
    document.getElementById("btn-budget-basic").classList.toggle("active", budgetType === 'basic');
    document.getElementById("btn-budget-premium").classList.toggle("active", budgetType === 'premium');
    renderFoodGrid();
}

function renderFoodGrid() {
    const grid = document.getElementById("food-items-grid");
    if (!grid) return;

    const foods = foodDatabase[userState.lang][userState.currentBudget];
    grid.innerHTML = foods.map(food => `
        <div class="food-item" onclick="openRecipeModal('${food.id}')">
            <div class="food-icon">${food.icon}</div>
            <div class="food-info">
                <h4>${food.name}</h4>
                <div class="food-benefit">${food.benefit}</div>
                <p>${food.desc}</p>
                <span class="food-action-tip">${userState.lang === 'es' ? 'Ver Receta & Preparación ➔' : 'View Recipe & Prep ➔'}</span>
            </div>
        </div>
    `).join('');
}

function openRecipeModal(foodId) {
    const foods = foodDatabase[userState.lang][userState.currentBudget];
    const food = foods.find(f => f.id === foodId);
    if (!food) return;

    document.getElementById("modal-recipe-title").textContent = food.name;
    document.getElementById("modal-recipe-diff").textContent = food.difficulty;
    document.getElementById("modal-recipe-ingredients").innerHTML = food.ingredients.map(ing => `<li>${ing}</li>`).join('');
    document.getElementById("modal-recipe-steps").innerHTML = food.steps.map(step => `<li>${step}</li>`).join('');
    
    document.getElementById("recipe-modal").classList.remove("d-none");
}

function closeRecipeModal() {
    document.getElementById("recipe-modal").classList.add("d-none");
}

// --- MICRO-HABITS TIMER ---
function renderHabitsSelector() {
    const listContainer = document.getElementById("habits-selector-list");
    if (!listContainer) return;

    const list = habitsList[userState.lang];
    listContainer.innerHTML = list.map((habit, idx) => `
        <div class="habit-row ${userState.activeHabitIndex === idx ? 'active' : ''}" onclick="selectHabit(${idx})">
            <div class="habit-meta">
                <h4>${habit.name}</h4>
                <span>⏱️ ${habit.duration / 60} ${userState.lang === 'es' ? 'Minutos' : 'Minutes'} • +${habit.points} pts</span>
            </div>
            <div class="habit-checkmark">➔</div>
        </div>
    `).join('');
}

function selectHabit(idx) {
    if (userState.timerRunning) {
        if (!confirm(userState.lang === 'es' ? "Hay un cronómetro activo. ¿Cambiar de hábito?" : "Timer is running. Switch habit?")) {
            return;
        }
        clearInterval(userState.timerInterval);
        userState.timerRunning = false;
        document.getElementById("btn-timer-toggle").textContent = i18n[userState.lang].habits_timer_start;
    }

    userState.activeHabitIndex = idx;
    const selected = habitsList[userState.lang][idx];
    
    document.getElementById("current-habit-title").textContent = selected.name;
    document.getElementById("current-habit-desc").textContent = selected.desc;
    userState.timerSecondsLeft = selected.duration;
    updateTimerDisplay();
    renderHabitsSelector();
}

function updateTimerDisplay() {
    const mins = Math.floor(userState.timerSecondsLeft / 60);
    const secs = userState.timerSecondsLeft % 60;
    document.getElementById("timer-minutes").textContent = String(mins).padStart(2, '0');
    document.getElementById("timer-seconds").textContent = String(secs).padStart(2, '0');
}

function toggleTimer() {
    const button = document.getElementById("btn-timer-toggle");
    const dict = i18n[userState.lang];
    
    if (userState.timerRunning) {
        clearInterval(userState.timerInterval);
        userState.timerRunning = false;
        button.textContent = dict.habits_timer_resume;
    } else {
        userState.timerRunning = true;
        button.textContent = dict.habits_timer_pause;
        
        userState.timerInterval = setInterval(() => {
            if (userState.timerSecondsLeft > 0) {
                userState.timerSecondsLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(userState.timerInterval);
                userState.timerRunning = false;
                button.textContent = dict.habits_timer_start;
                
                const activeHabit = habitsList[userState.lang][userState.activeHabitIndex];
                alert(userState.lang === 'es' ? `¡Buen trabajo! Has completado ${activeHabit.name}. +${activeHabit.points} puntos.` : `Good job! You completed ${activeHabit.name}. +${activeHabit.points} points.`);
                
                userState.healthScore = Math.min(100, userState.healthScore + activeHabit.points);
                userState.completedHabitsCount++;
                userState.lastHabitTime = Date.now();
                updateDashboardUI();
                renderWeeklyChart();
                resetTimer();
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(userState.timerInterval);
    userState.timerRunning = false;
    document.getElementById("btn-timer-toggle").textContent = i18n[userState.lang].habits_timer_start;
    
    const activeHabit = habitsList[userState.lang][userState.activeHabitIndex];
    userState.timerSecondsLeft = activeHabit.duration;
    updateTimerDisplay();
}

// ==========================================
// MUSIC PLAYER LOGIC (ROYALTY FREE AUDIO)
// ==========================================
const playlist = [
    { title: "SoundHelix Song 1 (Energizing)", artist: "SoundHelix • Royalty Free", url: "assets/music1.mp3", cover: "⚡" },
    { title: "SoundHelix Song 2 (Cardio Flow)", artist: "SoundHelix • Royalty Free", url: "assets/music2.mp3", cover: "🔥" },
    { title: "SoundHelix Song 3 (Focus Beat)", artist: "SoundHelix • Royalty Free", url: "assets/music3.mp3", cover: "🧘" }
];
let currentTrackIndex = 0;
let isAudioPlaying = false;
let audioElement = null;

function initAudioPlayer() {
    audioElement = document.getElementById("main-audio-element");
    if (!audioElement) return;

    audioElement.addEventListener("timeupdate", updateAudioProgress);
    audioElement.addEventListener("loadedmetadata", () => {
        const total = document.getElementById("total-duration");
        if (total) total.textContent = formatTime(audioElement.duration);
    });
    audioElement.addEventListener("ended", nextTrack);

    loadTrack(currentTrackIndex);
}

function loadTrack(index) {
    const track = playlist[index];
    if (!audioElement) return;

    audioElement.src = track.url;
    document.getElementById("track-title").textContent = track.title;
    document.getElementById("track-artist").textContent = track.artist;
    document.getElementById("music-cover").textContent = track.cover;
    document.getElementById("audio-progress").value = 0;
    document.getElementById("current-time").textContent = "0:00";
    
    if (isAudioPlaying) {
        audioElement.play().catch(err => console.log("Play error: ", err));
    }
}

function togglePlayMusic() {
    if (!audioElement) initAudioPlayer();
    
    const playBtn = document.getElementById("btn-play-music");
    const cover = document.getElementById("music-cover");

    if (isAudioPlaying) {
        audioElement.pause();
        isAudioPlaying = false;
        playBtn.textContent = "▶️";
        cover.classList.remove("playing");
    } else {
        audioElement.play().catch(err => console.log("Play error: ", err));
        isAudioPlaying = true;
        playBtn.textContent = "⏸️";
        cover.classList.add("playing");
    }
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
}

function seekAudio() {
    const slider = document.getElementById("audio-progress");
    const seekTime = (slider.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
}

function updateAudioProgress() {
    const slider = document.getElementById("audio-progress");
    const elapsed = document.getElementById("current-time");
    
    if (audioElement && audioElement.duration) {
        const pct = (audioElement.currentTime / audioElement.duration) * 100;
        slider.value = pct;
        elapsed.textContent = formatTime(audioElement.currentTime);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// ==========================================
// LIBRARY / BOOK MODAL LOGIC
// ==========================================
const booksDatabase = {
    es: {
        guia_paciente: { title: "Guía del Cuidado Hepático", author: "OMS & Salud Pública", summary: "Manual oficial sobre esteatosis hepática (hígado graso). Explica de manera científica pero sencilla cómo revertir la acumulación de grasa mediante cambios paulatinos en la hidratación y hábitos de oficina.", bullets: ["<strong>El enemigo silencioso:</strong> Entiende por qué el hígado graso no causa dolores hasta etapas avanzadas.", "<strong>Fisiología simple:</strong> Cómo el exceso de fructosa industrial se convierte rápidamente en grasa visceral.", "<strong>Plan OMS:</strong> Los pilares clínicos recomendados a nivel mundial para recuperar la salud metabólica."], url: "https://www.who.int/publications/i" },
        nutricion_basica: { title: "Alimentos del Hígado", author: "Guía Práctica Nutricional", summary: "Este recetario de bolsillo enseña a cocinar alimentos protectores sin gastar de más. Resalta el uso de avena integral, ajo y té verde como activadores de las fases de desintoxicación hepática.", bullets: ["<strong>Recetas de bajo presupuesto:</strong> Platos saludables de alta potencia celular usando alimentos de feria.", "<strong>Poder desinflamatorio:</strong> Por qué combinar cúrcuma con pimienta aumenta la absorción un 2000%.", "<strong>Guía de infusiones:</strong> Preparación paso a paso de extractos como diente de león y cardo mariano."], url: "https://www.fao.org/nutrition/es/" },
        habitos_efectivos: { title: "Hábitos en 5 Minutos", author: "Estilo de Vida Saludable", summary: "Diseñado para personas extremadamente ocupadas. Explica la ciencia detrás de las pausas activas y cómo la activación del músculo sóleo en el escritorio puede controlar los picos de glucosa en sangre.", bullets: ["<strong>La regla de los 5 minutos:</strong> Por qué la constancia diaria supera a las horas extenuantes de fin de semana.", "<strong>Movimiento invisible:</strong> Ejercicios discretos y prácticos que puedes hacer en tu silla de oficina.", "<strong>Construcción de hábitos:</strong> Métodos de encadenamiento para automatizar tus tomas de agua diarias."], url: "https://www.nhlbi.nih.gov/health/educational/wecan/downloads/general-tips-spanish.pdf" }
    },
    en: {
        guia_paciente: { title: "Liver Care Guide", author: "WHO & Public Health", summary: "Official manual on hepatic steatosis (fatty liver). Explains scientifically but simply how to reverse fat accumulation through gradual changes in hydration and office habits.", bullets: ["<strong>The silent enemy:</strong> Understand why fatty liver doesn't cause pain until advanced stages.", "<strong>Simple physiology:</strong> How excess industrial fructose quickly converts to visceral fat.", "<strong>WHO Plan:</strong> World-recommended clinical pillars to recover metabolic health."], url: "https://www.who.int/publications/i" },
        nutricion_basica: { title: "Foods for the Liver", author: "Nutrition Practical Guide", summary: "This pocket recipe book teaches how to cook protective foods without overspending. Highlights oats, garlic, and green tea as natural phase detoxification triggers.", bullets: ["<strong>Low budget recipes:</strong> Healthy high-power meals using local markets produce.", "<strong>Anti-inflammatory power:</strong> Why combining turmeric with pepper increases absorption by 2000%.", "<strong>Infusion guides:</strong> Step-by-step preparation of dandelion and milk thistle extracts."], url: "https://www.fao.org/nutrition/es/" },
        habitos_efectivos: { title: "5-Minute Habits", author: "Healthy Lifestyle", summary: "Designed for extremely busy people. Explains active breaks science and how soleus muscle activation at the desk controls blood glucose spikes.", bullets: ["<strong>The 5-minute rule:</strong> Why daily consistency beats weekend exhausting gym workouts.", "<strong>Invisible movement:</strong> Discreet and practical exercises you can do on your office chair.", "<strong>Habit building:</strong> Stacking methods to automate your daily water intake."], url: "https://www.nhlbi.nih.gov/health/educational/wecan/downloads/general-tips-spanish.pdf" }
    }
};

function openBookModal(bookId) {
    const book = booksDatabase[userState.lang][bookId];
    if (!book) return;

    document.getElementById("modal-book-title").textContent = book.title;
    document.getElementById("modal-book-author").textContent = book.author;
    document.getElementById("modal-book-summary").textContent = book.summary;

    const bulletsList = document.getElementById("modal-book-bullets");
    bulletsList.innerHTML = book.bullets.map(b => `<li>${b}</li>`).join('');

    const downloadBtn = document.getElementById("modal-book-download-btn");
    downloadBtn.href = book.url;

    document.getElementById("book-modal").classList.remove("d-none");
}

function closeBookModal() {
    document.getElementById("book-modal").classList.add("d-none");
}

// ==========================================
// DOC AI & GLOSSARY FUNCTIONALITY
// ==========================================
const docGlossaryDb = {
    es: {
        summary: "El examen cargado muestra indicadores de función hepática y lipídica. A continuación se desglosan los términos técnicos clave encontrados en su reporte para que pueda comprenderlos de manera sencilla y tomar medidas de prevención oportunas.",
        terms: [
            { name: "Transaminasa ALT (Alanina Aminotransferasa)", desc: "Una enzima que se encuentra principalmente en el hígado. Niveles elevados sugieren inflamación o daño celular hepático (común en hígado graso)." },
            { name: "Transaminasa AST (Aspartato Aminotransferasa)", desc: "Enzima presente en el hígado, corazón y músculos. Junto con la ALT, ayuda a los médicos a evaluar el grado de lesión en los hepatocitos." },
            { name: "Esteatosis Hepática (Hígado Graso)", desc: "Acumulación excesiva de triglicéridos en las células del hígado. Es reversible en sus etapas iniciales mediante cambios en alimentación y actividad física." },
            { name: "Bilirrubina", desc: "Un pigmento amarillento que se produce durante la descomposición normal de los glóbulos rojos. Pasa a través del hígado y se expulsa. Su elevación puede indicar congestión o disfunción hepática." }
        ]
    },
    en: {
        summary: "The uploaded report shows key liver function and lipid markers. Below is an easy-to-understand breakdown of the technical terms identified in your test to help you take timely preventive actions.",
        terms: [
            { name: "ALT Transaminase (Alanine Aminotransferase)", desc: "An enzyme found primarily in the liver. Elevated levels suggest liver cell inflammation or damage (common in fatty liver)." },
            { name: "AST Transaminase (Aspartate Aminotransferase)", desc: "An enzyme present in the liver, heart, and muscles. Together with ALT, it helps evaluate the degree of hepatocyte injury." },
            { name: "Hepatic Steatosis (Fatty Liver)", desc: "Excessive accumulation of triglycerides within liver cells. It is reversible in its early stages through dietary changes and physical activity." },
            { name: "Bilirubin", desc: "A yellowish pigment made during the normal breakdown of red blood cells. It passes through the liver and is excreted. High levels can indicate liver congestion or dysfunction." }
        ]
    }
};

function switchTestMode(mode) {
    const btnQuiz = document.getElementById("btn-mode-quiz");
    const btnDoc = document.getElementById("btn-mode-doc");
    const quizContainer = document.getElementById("quiz-section-container");
    const docContainer = document.getElementById("doc-section-container");

    if (mode === 'quiz') {
        btnQuiz.classList.add("active");
        btnQuiz.style.background = "var(--bg-dark)";
        btnQuiz.style.color = "var(--text-primary)";
        btnDoc.classList.remove("active");
        btnDoc.style.background = "none";
        btnDoc.style.color = "var(--text-muted)";
        
        quizContainer.classList.remove("d-none");
        docContainer.classList.add("d-none");
    } else {
        btnDoc.classList.add("active");
        btnDoc.style.background = "var(--bg-dark)";
        btnDoc.style.color = "var(--text-primary)";
        btnQuiz.classList.remove("active");
        btnQuiz.style.background = "none";
        btnQuiz.style.color = "var(--text-muted)";
        
        quizContainer.classList.add("d-none");
        docContainer.classList.remove("d-none");
    }
}

function triggerFileInput() {
    const fileInput = document.getElementById("doc-file-input");
    if (fileInput) fileInput.click();
}

function handleFileSelect(input) {
    if (input.files && input.files[0]) {
        startDocScan();
    }
}

function startDocScan() {
    const laser = document.getElementById("laser-scanline");
    const scanningStatus = document.getElementById("doc-scanning-status");
    const resultsReport = document.getElementById("doc-report-results");

    laser.classList.remove("d-none");
    scanningStatus.classList.remove("d-none");
    resultsReport.classList.add("d-none");

    setTimeout(() => {
        laser.classList.add("d-none");
        scanningStatus.classList.add("d-none");
        
        const lang = userState.lang;
        const glossaryData = docGlossaryDb[lang];
        
        document.getElementById("doc-summary-text").innerHTML = glossaryData.summary;
        
        const listContainer = document.getElementById("doc-glossary-list");
        listContainer.innerHTML = glossaryData.terms.map(term => `
            <div class="glossary-item">
                <h5>${term.name}</h5>
                <p>${term.desc}</p>
            </div>
        `).join('');
        
        resultsReport.classList.remove("d-none");

        userState.healthScore = Math.min(100, userState.healthScore + 5);
        updateDashboardUI();
        renderWeeklyChart();
    }, 2500);
}

function resetDocScanner() {
    document.getElementById("doc-report-results").classList.add("d-none");
    document.getElementById("doc-file-input").value = "";
}

function initDocDropzone() {
    const dropzone = document.getElementById("doc-dropzone");
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('dragover');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            document.getElementById("doc-file-input").files = files;
            startDocScan();
        }
    }, false);
}

// ==========================================
// HEPA-COACH STRICT ALERT & NOTIFICATION SYSTEM
// ==========================================
let notificationPermissionGranted = false;

function requestNotificationPermission() {
    if (!("Notification" in window)) {
        showToast("HepaCoach AI", userState.lang === 'es' ? "Tu navegador no soporta notificaciones de escritorio." : "Desktop notifications are not supported by your browser.", "warning");
        return;
    }

    Notification.requestPermission().then(permission => {
        const btn = document.getElementById("btn-enable-notifications");
        const desc = document.getElementById("coach-status-desc");
        const dict = i18n[userState.lang];

        if (permission === "granted") {
            notificationPermissionGranted = true;
            showToast("HepaCoach AI", userState.lang === 'es' ? "¡Alertas del sistema activadas! Te mantendré estricto." : "System alerts enabled! I will keep you disciplined.", "info");
            if (btn) btn.textContent = dict.btn_notifications_active || "✅ Alertas Activas";
            if (desc) desc.textContent = userState.lang === 'es' ? "Notificaciones nativas activadas correctamente. El asesor te alertará periódicamente." : "Native alerts enabled. The coach will alert you periodically.";
        } else {
            showToast("HepaCoach AI", userState.lang === 'es' ? "Permiso denegado. Se usarán avisos internos." : "Permission denied. Internal alerts will be used.", "warning");
        }
    });
}

function showToast(title, message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-alert ${type}`;
    
    let icon = "💡";
    if (type === "warning") icon = "⚠️";
    if (type === "danger") icon = "🚨";
    if (title.includes("Coach") || title.includes("Robot")) icon = "🤖";
    if (title.includes("Agua") || title.includes("Water")) icon = "💧";
    if (title.includes("Pausa") || title.includes("Break")) icon = "⏱️";

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Auto dismiss after 6 seconds
    setTimeout(() => {
        toast.classList.add("hide");
        setTimeout(() => toast.remove(), 300);
    }, 6000);
}

function sendSystemNotification(title, message) {
    if (notificationPermissionGranted) {
        new Notification(title, {
            body: message,
            icon: "logo.png"
        });
    }
}

// Strict Alert Engine Check (Runs every 40 seconds)
function runCoachAlertCheck() {
    if (!userState.user) return;

    const now = Date.now();
    const timeSinceWater = now - userState.lastWaterTime;
    const timeSinceHabit = now - userState.lastHabitTime;

    // Simulation threshold: 45 seconds of inactivity triggers a strict reminder
    const threshold = 45000; 

    if (timeSinceWater > threshold) {
        userState.lastWaterTime = now;
        
        const title = userState.lang === 'es' ? "💧 ¡HepaCoach: Alerta de Hidratación!" : "💧 HepaCoach: Hydration Alert!";
        const msg = userState.lang === 'es' 
            ? "¡Han pasado más de 2 horas desde tu último registro! Bebe 250ml de agua para purificar tu hígado." 
            : "More than 2 hours since your last drink! Have 250ml of water to cleanse your liver.";
        
        showToast(title, msg, "warning");
        sendSystemNotification(title, msg);
        
        userState.healthScore = Math.max(30, userState.healthScore - 2);
        updateDashboardUI();
        renderWeeklyChart();
    } else if (timeSinceHabit > threshold) {
        userState.lastHabitTime = now;
        
        const title = userState.lang === 'es' ? "⏱️ ¡HepaCoach: Alerta de Movimiento!" : "⏱️ HepaCoach: Active Break Alert!";
        const msg = userState.lang === 'es' 
            ? "Llevas demasiado tiempo sentado. Haz 5 mins de elevación de talones (sóleo) para limpiar tu glucosa." 
            : "You've been sitting too long. Do 5 mins of calf raises to clear your blood glucose.";
        
        showToast(title, msg, "danger");
        sendSystemNotification(title, msg);
        
        userState.healthScore = Math.max(30, userState.healthScore - 3);
        updateDashboardUI();
        renderWeeklyChart();
    }
}

// Scheduler is started in checkSession() after confirmed login
