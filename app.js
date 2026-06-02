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
        weekly_plan_title: "Plan Semanal Hepático",
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
        weekly_plan_title: "Weekly Liver Plan",
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

    let foods = foodDatabase[userState.lang][userState.currentBudget];
    
    // Filter by category if not 'all'
    if (userState.currentFoodCategory && userState.currentFoodCategory !== 'all') {
        foods = foods.filter(f => f.cat === userState.currentFoodCategory);
    }

    if (foods.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem; font-size: 0.8rem;">${userState.lang === 'es' ? 'No hay alimentos en esta categoría para tu presupuesto.' : 'No foods in this category for your budget.'}</div>`;
        return;
    }

    grid.innerHTML = foods.map(food => `
        <div class="food-item">
            <div class="food-item-header">
                <div class="food-icon">${food.icon}</div>
                <div class="food-info">
                    <h4>${food.name}</h4>
                    <div class="food-benefit">${food.benefit}</div>
                </div>
            </div>
            <div class="food-item-details">
                <span class="food-kcal-badge">${food.kcal} kcal</span>
                <span>P: ${food.protein}g</span>
                <span>C: ${food.carbs}g</span>
                <span>G: ${food.fat}g</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem; line-height: 1.3;">${food.desc}</p>
            <div class="food-item-actions">
                <button class="food-btn-mini" onclick="openRecipeModal('${food.id}')">${userState.lang === 'es' ? 'Receta' : 'Recipe'}</button>
                <button class="food-btn-mini log-btn" onclick="addFoodToLog('${food.id}')">${userState.lang === 'es' ? '+ Registrar' : '+ Log'}</button>
            </div>
        </div>
    `).join('');
}

function openRecipeModal(foodId) {
    const foods = foodDatabase[userState.lang][userState.currentBudget];
    const food = foods.find(f => f.id === foodId);
    if (!food) return;

    document.getElementById("modal-recipe-title").textContent = food.name;
    document.getElementById("modal-recipe-diff").textContent = `${food.difficulty} (${food.time})`;
    document.getElementById("modal-recipe-ingredients").innerHTML = food.ingredients.map(ing => `<li>${ing}</li>`).join('');
    document.getElementById("modal-recipe-steps").innerHTML = food.steps.map(step => `<li>${step}</li>`).join('');
    
    document.getElementById("recipe-modal").classList.remove("d-none");
}

function closeRecipeModal() {
    document.getElementById("recipe-modal").classList.add("d-none");
}

// --- MICRO-HABITS TIMER ---
// ==========================================
// GYM / HABITS - FULL PROFESSIONAL SYSTEM
// ==========================================

// Comprehensive exercise database (bilingual)
const exerciseDb = {
    es: [
        {
            id: 0, cat: "legs", icon: "🦵", anim: "bounce",
            name: "Elevación de Talones (Sóleo)", diff: "Fácil", duration: 300, kcal: 15, points: 5,
            muscles: ["Piernas", "Glucosa"],
            desc: "El músculo sóleo consume glucosa incluso en reposo. Hazlo en cualquier lugar, incluso sentado en la oficina.",
            steps: [
                "Párate derecho con pies separados al ancho de los hombros",
                "Levanta los talones lentamente hasta quedar en punta de pies",
                "Aguanta 1 segundo en la posición alta",
                "Baja despacio y repite sin parar durante 5 minutos"
            ]
        },
        {
            id: 1, cat: "core", icon: "💪", anim: "pulse",
            name: "Vacíos Abdominales (Plancha Isométrica)", diff: "Medio", duration: 180, kcal: 12, points: 4,
            muscles: ["Abdomen", "Core"],
            desc: "Contrae el abdomen como si quisieras tocar el ombligo con la espalda. Elimina grasa visceral de forma directa.",
            steps: [
                "Ponte en posición de plancha: manos bajo los hombros, espalda recta",
                "Contrae el abdomen hacia adentro y arriba (vacío abdominal)",
                "Mantén la posición sin retener el aire, respira normal",
                "Aguanta 30 segundos, descansa 10 segundos y repite"
            ]
        },
        {
            id: 2, cat: "breath", icon: "🫁", anim: "pulse",
            name: "Respiración Diafragmática", diff: "Fácil", duration: 180, kcal: 5, points: 4,
            muscles: ["Estrés", "Cortisol"],
            desc: "Reduce el cortisol que acumula grasa abdominal. Activar el nervio vago mejora la función hepática directamente.",
            steps: [
                "Siéntate cómodo con una mano en el pecho y otra en el abdomen",
                "Inhala lento por la nariz por 4 segundos, el abdomen debe expandirse",
                "Aguanta 2 segundos sin respirar",
                "Exhala por la boca por 6 segundos, el abdomen baja. Repite 10 veces"
            ]
        },
        {
            id: 3, cat: "arms", icon: "🦾", anim: "bounce",
            name: "Flexiones de Pared", diff: "Fácil", duration: 180, kcal: 10, points: 4,
            muscles: ["Brazos", "Pecho"],
            desc: "La versión más accesible de las flexiones. Activa la musculatura del tren superior y mejora el metabolismo basal.",
            steps: [
                "Párate a 60 cm de la pared, pon las palmas al ancho de los hombros",
                "Dobla los codos lentamente y acércate a la pared",
                "Empuja fuerte para volver a la posición inicial",
                "Completa 3 series de 15 repeticiones con descanso de 30 segundos"
            ]
        },
        {
            id: 4, cat: "legs", icon: "🏋️", anim: "bounce",
            name: "Sentadillas con Peso Corporal", diff: "Medio", duration: 300, kcal: 25, points: 6,
            muscles: ["Glúteos", "Piernas", "Glucosa"],
            desc: "El ejercicio más eficiente para bajar la glucosa en sangre. Los músculos grandes actúan como esponjas de glucosa.",
            steps: [
                "Para con pies separados al ancho de los hombros, punta de pies ligeramente hacia afuera",
                "Baja lento como si fueras a sentarte en una silla imaginaria",
                "Las rodillas siguen la línea de los pies, espalda recta",
                "Sube empujando los talones contra el suelo. Completa 3 series de 20"
            ]
        },
        {
            id: 5, cat: "stretch", icon: "🧘", anim: "rotate",
            name: "Torsión Espinal Sentado", diff: "Fácil", duration: 120, kcal: 4, points: 3,
            muscles: ["Espalda", "Hígado"],
            desc: "La torsión suave comprime y descomprime el hígado, mejorando el flujo de bilis y la circulación portal.",
            steps: [
                "Siéntate en el borde de la silla con la espalda recta",
                "Coloca la mano derecha en la rodilla izquierda",
                "Gira el torso suavemente hacia la izquierda, aguanta 20 segundos",
                "Cambia de lado. Repite 3 veces por lado, respirando profundo"
            ]
        },
        {
            id: 6, cat: "core", icon: "🔄", anim: "rotate",
            name: "Crunch Abdominal Suave", diff: "Medio", duration: 240, kcal: 18, points: 5,
            muscles: ["Abdomen", "Recto"],
            desc: "Fortalece los músculos del abdomen para proteger el hígado y mejorar la postura que afecta la digestión.",
            steps: [
                "Acuéstate boca arriba, rodillas dobladas, pies apoyados en el suelo",
                "Entrecruza los dedos detrás de la cabeza sin jalar el cuello",
                "Exhala y sube los hombros 30 cm del suelo contrayendo el abdomen",
                "Baja lento sin apoyar la espalda completamente. Haz 3 series de 15"
            ]
        },
        {
            id: 7, cat: "stretch", icon: "🌊", anim: "bounce",
            name: "Caminata Activa en Casa", diff: "Fácil", duration: 300, kcal: 30, points: 6,
            muscles: ["Cuerpo Completo", "Circulación"],
            desc: "Caminar 5 minutos después de comer reduce el pico de glucosa un 30%. El movimiento más simple y poderoso.",
            steps: [
                "Camina de un cuarto a otro o en el lugar, levantando las rodillas",
                "Mantén los brazos en movimiento sincronizados con las piernas",
                "El ritmo debe ser moderado, sin agitarte demasiado",
                "Hazlo especialmente 10-15 minutos después de cada comida"
            ]
        }
    ],
    en: [
        {
            id: 0, cat: "legs", icon: "🦵", anim: "bounce",
            name: "Calf Raises (Soleus Activation)", diff: "Easy", duration: 300, kcal: 15, points: 5,
            muscles: ["Legs", "Glucose"],
            desc: "The soleus muscle burns glucose even at rest. Do it anywhere, even sitting at your desk.",
            steps: [
                "Stand straight with feet shoulder-width apart",
                "Slowly raise your heels until you are on your tiptoes",
                "Hold for 1 second at the top position",
                "Lower slowly and repeat continuously for 5 minutes"
            ]
        },
        {
            id: 1, cat: "core", icon: "💪", anim: "pulse",
            name: "Abdominal Vacuum (Isometric Plank)", diff: "Medium", duration: 180, kcal: 12, points: 4,
            muscles: ["Abdomen", "Core"],
            desc: "Draw your belly button toward your spine. Directly targets visceral fat around your liver.",
            steps: [
                "Get into plank position: hands under shoulders, straight back",
                "Pull your abdomen inward and upward (abdominal vacuum)",
                "Hold without holding your breath, breathe normally",
                "Hold 30 seconds, rest 10 seconds, repeat"
            ]
        },
        {
            id: 2, cat: "breath", icon: "🫁", anim: "pulse",
            name: "Diaphragmatic Breathing", diff: "Easy", duration: 180, kcal: 5, points: 4,
            muscles: ["Stress", "Cortisol"],
            desc: "Reduces cortisol that accumulates belly fat. Activating the vagus nerve directly improves liver function.",
            steps: [
                "Sit comfortably with one hand on chest and one on belly",
                "Inhale slowly through your nose for 4 seconds, belly should expand",
                "Hold for 2 seconds",
                "Exhale through your mouth for 6 seconds, belly drops. Repeat 10 times"
            ]
        },
        {
            id: 3, cat: "arms", icon: "🦾", anim: "bounce",
            name: "Wall Push-Ups", diff: "Easy", duration: 180, kcal: 10, points: 4,
            muscles: ["Arms", "Chest"],
            desc: "The most accessible push-up variation. Activates upper body muscles and boosts basal metabolism.",
            steps: [
                "Stand 60 cm from a wall, palms shoulder-width apart on wall",
                "Slowly bend elbows and lean toward the wall",
                "Push strongly back to starting position",
                "Complete 3 sets of 15 reps with 30 second rest"
            ]
        },
        {
            id: 4, cat: "legs", icon: "🏋️", anim: "bounce",
            name: "Bodyweight Squats", diff: "Medium", duration: 300, kcal: 25, points: 6,
            muscles: ["Glutes", "Legs", "Glucose"],
            desc: "The most efficient exercise to lower blood glucose. Large muscles act as glucose sponges.",
            steps: [
                "Stand feet shoulder-width apart, toes slightly outward",
                "Lower slowly as if sitting in an imaginary chair",
                "Knees follow the line of your feet, back straight",
                "Push through your heels to rise. Complete 3 sets of 20"
            ]
        },
        {
            id: 5, cat: "stretch", icon: "🧘", anim: "rotate",
            name: "Seated Spinal Twist", diff: "Easy", duration: 120, kcal: 4, points: 3,
            muscles: ["Back", "Liver"],
            desc: "Gentle twisting compresses and decompresses the liver, improving bile flow and portal circulation.",
            steps: [
                "Sit on edge of chair with straight back",
                "Place right hand on left knee",
                "Gently rotate torso to the left, hold 20 seconds",
                "Switch sides. Repeat 3 times per side, breathing deeply"
            ]
        },
        {
            id: 6, cat: "core", icon: "🔄", anim: "rotate",
            name: "Gentle Crunches", diff: "Medium", duration: 240, kcal: 18, points: 5,
            muscles: ["Abdomen", "Rectus"],
            desc: "Strengthens abdominal muscles to protect the liver and improve posture that affects digestion.",
            steps: [
                "Lie on your back, knees bent, feet flat on floor",
                "Interlace fingers behind head without pulling on neck",
                "Exhale and lift shoulders 30 cm off floor, contracting abs",
                "Lower slowly without fully resting back. Do 3 sets of 15"
            ]
        },
        {
            id: 7, cat: "stretch", icon: "🌊", anim: "bounce",
            name: "Active Walking Indoors", diff: "Easy", duration: 300, kcal: 30, points: 6,
            muscles: ["Full Body", "Circulation"],
            desc: "Walking 5 minutes after eating reduces glucose peaks by 30%. The simplest and most powerful movement.",
            steps: [
                "Walk from room to room or march in place, lifting knees",
                "Keep arms moving in sync with legs",
                "Maintain a moderate pace without getting too winded",
                "Do it especially 10-15 minutes after every meal"
            ]
        }
    ]
};

// Weekly hepatic training plan
const weeklyPlan = {
    es: [
        { day: "Lun", icon: "🦵", focus: "Piernas\n& Glucosa", done: false },
        { day: "Mar", icon: "🫁", focus: "Respira-\nción", done: false },
        { day: "Mié", icon: "💪", focus: "Core\n& Abdomen", done: false },
        { day: "Jue", icon: "🌊", focus: "Caminata\nActiva", done: false },
        { day: "Vie", icon: "🧘", focus: "Estira-\nmiento", done: false }
    ],
    en: [
        { day: "Mon", icon: "🦵", focus: "Legs\n& Glucose", done: false },
        { day: "Tue", icon: "🫁", focus: "Breath-\ning", done: false },
        { day: "Wed", icon: "💪", focus: "Core\n& Abs", done: false },
        { day: "Thu", icon: "🌊", focus: "Active\nWalk", done: false },
        { day: "Fri", icon: "🧘", focus: "Stretch-\ning", done: false }
    ]
};

let activeFilter = 'all';

function renderHabitsSelector() {
    const listContainer = document.getElementById("habits-selector-list");
    if (!listContainer) return;

    const list = exerciseDb[userState.lang];
    const filtered = activeFilter === 'all' ? list : list.filter(e => e.cat === activeFilter);
    const diffMap = { es: { Fácil: "", Medio: "medio", Avanzado: "avanzado" }, en: { Easy: "", Medium: "medio", Advanced: "avanzado" } };

    listContainer.innerHTML = filtered.map(ex => `
        <div class="gym-ex-card ${userState.activeHabitIndex === ex.id ? 'selected' : ''}" onclick="selectHabit(${ex.id})">
            <span class="gym-ex-icon">${ex.icon}</span>
            <div class="gym-ex-name">${ex.name}</div>
            <div class="gym-ex-meta">
                <span class="gym-ex-time">⏱ ${ex.duration / 60} min</span>
                <span class="gym-ex-kcal">🔥 ${ex.kcal} kcal</span>
            </div>
            <div class="gym-ex-diff">${ex.diff}</div>
        </div>
    `).join('');

    renderWeeklyPlan();
}

function renderWeeklyPlan() {
    const container = document.getElementById("weekly-plan-grid");
    if (!container) return;
    const today = new Date().getDay(); // 0=Sun, 1=Mon...5=Fri
    const plan = weeklyPlan[userState.lang];
    container.innerHTML = plan.map((day, i) => {
        const isToday = (i + 1) === today; // Mon=1
        const isDone = userState.completedHabitsCount > i;
        return `
        <div class="week-day-col">
            <div class="week-day-label">${day.day}</div>
            <div class="week-day-pill ${isDone ? 'done' : ''} ${isToday && !isDone ? 'today' : ''}">
                <span class="week-day-pill-icon">${isDone ? '✅' : day.icon}</span>
                <span class="week-day-pill-name">${day.focus.replace('\n', '<br>')}</span>
            </div>
        </div>`;
    }).join('');
}

function filterHabits(cat) {
    activeFilter = cat;
    document.querySelectorAll('.cat-chip').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    renderHabitsSelector();
}

function selectHabit(id) {
    if (userState.timerRunning) {
        const msg = userState.lang === 'es' ? "Hay un cronómetro activo. ¿Cambiar de ejercicio?" : "Timer is running. Switch exercise?";
        if (!confirm(msg)) return;
        clearInterval(userState.timerInterval);
        userState.timerRunning = false;
        document.getElementById("btn-timer-toggle").textContent = '▶ ' + i18n[userState.lang].habits_timer_start;
    }

    userState.activeHabitIndex = id;
    const ex = exerciseDb[userState.lang].find(e => e.id === id);
    if (!ex) return;

    // Update timer card
    document.getElementById("current-habit-title").textContent = ex.name;
    document.getElementById("current-habit-desc").textContent = ex.desc;
    document.getElementById("gym-calorie-badge").textContent = `~${ex.kcal} kcal`;
    document.getElementById("exercise-anim-icon").textContent = ex.icon;
    document.getElementById("gym-diff-badge").textContent = ex.diff;

    // Difficulty badge class
    const diffBadge = document.getElementById("gym-diff-badge");
    diffBadge.className = "gym-diff-badge";
    const diffLower = ex.diff.toLowerCase();
    if (diffLower.includes('medio') || diffLower.includes('medium')) diffBadge.classList.add("medio");
    if (diffLower.includes('avanz') || diffLower.includes('advanc')) diffBadge.classList.add("avanzado");

    // Update muscle tags
    document.getElementById("gym-muscle-tags").innerHTML = ex.muscles.map(m => `<span class="muscle-tag">${m}</span>`).join('');

    // Update animation class
    const icon = document.getElementById("exercise-anim-icon");
    icon.className = `exercise-anim-icon ${ex.anim}`;

    // Update steps
    document.getElementById("gym-steps-list").innerHTML = ex.steps.map(s => `<li>${s}</li>`).join('');

    userState.timerSecondsLeft = ex.duration;
    updateTimerDisplay();
    renderHabitsSelector();

    // Scroll timer into view
    document.getElementById("gym-active-card").scrollIntoView({ behavior: "smooth", block: "nearest" });
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
        button.textContent = '▶ ' + dict.habits_timer_resume;
    } else {
        userState.timerRunning = true;
        button.textContent = '⏸ ' + dict.habits_timer_pause;

        // Animate exercise icon faster while running
        document.getElementById("exercise-anim-icon").style.animationDuration = "0.8s";

        userState.timerInterval = setInterval(() => {
            if (userState.timerSecondsLeft > 0) {
                userState.timerSecondsLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(userState.timerInterval);
                userState.timerRunning = false;
                button.textContent = '▶ ' + dict.habits_timer_start;
                document.getElementById("exercise-anim-icon").style.animationDuration = "";

                const ex = exerciseDb[userState.lang].find(e => e.id === userState.activeHabitIndex) || exerciseDb[userState.lang][0];
                const msg = userState.lang === 'es'
                    ? `🎉 ¡Excelente! Completaste "${ex.name}".\n+${ex.points} puntos de salud hepática.`
                    : `🎉 Great job! You completed "${ex.name}".\n+${ex.points} liver health points.`;
                alert(msg);

                userState.healthScore = Math.min(100, userState.healthScore + ex.points);
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
    document.getElementById("btn-timer-toggle").textContent = '▶ ' + i18n[userState.lang].habits_timer_start;
    document.getElementById("exercise-anim-icon").style.animationDuration = "";

    const ex = exerciseDb[userState.lang].find(e => e.id === userState.activeHabitIndex) || exerciseDb[userState.lang][0];
    userState.timerSecondsLeft = ex.duration;
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

// ==========================================
// HEPA-COACH STRICT ALERT & COMPLIANCE SYSTEM
// ==========================================

// Web Audio API Sound Chime Synthesis
function playWebAudioTone(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        const playChime = (freqs, durations, typeOsc = "sine", gainVal = 0.08) => {
            let time = ctx.currentTime;
            freqs.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gainNode = ctx.createGain();
                
                osc.type = typeOsc;
                osc.frequency.value = freq;
                
                gainNode.gain.setValueAtTime(gainVal, time);
                gainNode.gain.exponentialRampToValueAtTime(0.0001, time + durations[idx]);
                
                osc.connect(gainNode);
                gainNode.connect(ctx.destination);
                
                osc.start(time);
                osc.stop(time + durations[idx]);
                
                time += durations[idx] * 0.4; // slight overlap
            });
        };

        if (type === 'success') {
            // Rising success chord
            playChime([523.25, 659.25, 783.99, 1046.50], [0.15, 0.15, 0.15, 0.3], "sine", 0.08);
        } else if (type === 'alert') {
            // High warning double chime
            playChime([659.25, 659.25], [0.2, 0.35], "triangle", 0.06);
        } else if (type === 'warning') {
            // Low error buzz
            playChime([220.00, 180.00], [0.25, 0.3], "sawtooth", 0.04);
        } else if (type === 'snooze') {
            // Warm single chime
            playChime([392.00], [0.4], "sine", 0.08);
        }
    } catch (e) {
        console.warn("Web Audio Context blocked or not supported: ", e);
    }
}

function toggleSimulationMode(enabled) {
    if (!userState.user) return;
    const prefix = userState.user.username;
    userState.simulationMode = enabled;
    localStorage.setItem("hepaSimMode_" + prefix, enabled ? "true" : "false");
    
    // Reset timers to now to avoid immediate alarms on switch
    userState.lastWaterTime = Date.now();
    userState.lastHabitTime = Date.now();
    localStorage.setItem("hepaLastWaterTime_" + prefix, userState.lastWaterTime);
    localStorage.setItem("hepaLastHabitTime_" + prefix, userState.lastHabitTime);

    showToast(
        "HepaCoach AI", 
        userState.lang === 'es' 
            ? `Modo Simulación ${enabled ? 'Activado (Alertas cada 60s)' : 'Desactivado (Modo Real)'}`
            : `Simulation Mode ${enabled ? 'Enabled (Alerts every 60s)' : 'Disabled (Real Mode)'}`, 
        "info"
    );

    startCoachScheduler();
    updateDashboardUI();
    renderAlertTimeline();
}

function startCoachScheduler() {
    if (userState._alertIntervalId) {
        clearInterval(userState._alertIntervalId);
    }

    // Interval: 5 seconds in simulation mode, 15 seconds in real clinical mode
    const checkInterval = userState.simulationMode ? 5000 : 15000;
    userState._alertIntervalId = setInterval(runCoachAlertCheck, checkInterval);
}

function runCoachAlertCheck() {
    if (!userState.user || userState.pendingAlert) return;

    const now = Date.now();
    const elapsedWater = now - userState.lastWaterTime;
    const elapsedHabit = now - userState.lastHabitTime;

    // Thresholds:
    // Simulation: Water = 60s (60000ms), Habit = 90s (90000ms)
    // Real Clinical: Water = 3 hours (10,800,000ms), Habit = 2 hours (7,200,000ms)
    const waterThreshold = userState.simulationMode ? 60000 : 10800000;
    const habitThreshold = userState.simulationMode ? 90000 : 7200000;

    if (elapsedWater > waterThreshold) {
        triggerCoachAlert('water');
    } else if (elapsedHabit > habitThreshold) {
        triggerCoachAlert('habit');
    }
}

function triggerCoachAlert(type) {
    userState.pendingAlert = type;
    
    const overlay = document.getElementById("active-alert-overlay");
    if (!overlay) return;

    const iconEl = document.getElementById("alert-banner-icon");
    const titleEl = document.getElementById("alert-banner-title");
    const descEl = document.getElementById("alert-banner-desc");
    
    const isEs = userState.lang === 'es';
    
    if (type === 'water') {
        if (iconEl) iconEl.textContent = "💧";
        if (titleEl) titleEl.textContent = isEs ? "¡Alerta de Hidratación!" : "Hydration Alert!";
        if (descEl) descEl.textContent = isEs 
            ? "¡Han pasado más de 2 horas sin beber agua! Consume 250ml ahora para purificar tu hígado de toxinas." 
            : "More than 2 hours since your last drink! Have 250ml of water to cleanse your liver from toxins.";
    } else {
        if (iconEl) iconEl.textContent = "⏱️";
        if (titleEl) titleEl.textContent = isEs ? "¡Alerta de Movimiento!" : "Active Break Alert!";
        if (descEl) descEl.textContent = isEs 
            ? "Llevas demasiado tiempo sentado. Haz 5 minutos de elevación de talones (sóleo) o estiramiento activo." 
            : "You have been sitting for too long. Do 5 minutes of soleus calf raises or active stretching.";
    }

    // Play native synth audio
    playWebAudioTone('alert');

    // Show native system notification if permitted
    const sysTitle = isEs ? "HepaCoach AI Estricto" : "Strict HepaCoach AI";
    const sysMsg = type === 'water' 
        ? (isEs ? "¡Hora de beber agua (250ml)!" : "Time to drink water (250ml)!")
        : (isEs ? "¡Muévete! Haz una pausa activa de 5 mins." : "Move! Take a 5 min active break.");
    sendSystemNotification(sysTitle, sysMsg);

    // Show floating overlay
    overlay.classList.remove("d-none");
}

function handleActiveAlert(action) {
    const type = userState.pendingAlert;
    if (!type) return;

    const overlay = document.getElementById("active-alert-overlay");
    if (overlay) overlay.classList.add("d-none");

    userState.pendingAlert = null;
    const now = Date.now();
    const isEs = userState.lang === 'es';
    const timeStr = new Date().toLocaleTimeString(isEs ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    const prefix = userState.user.username;

    if (action === 'comply') {
        if (type === 'water') {
            userState.water += 0.25;
            userState.lastWaterTime = now;
            localStorage.setItem("hepaWater_" + prefix, userState.water);
            localStorage.setItem("hepaLastWaterTime_" + prefix, userState.lastWaterTime);
        } else {
            userState.completedHabitsCount = Math.min(4, userState.completedHabitsCount + 1);
            userState.lastHabitTime = now;
            localStorage.setItem("hepaCompletedHabitsCount_" + prefix, userState.completedHabitsCount);
            localStorage.setItem("hepaLastHabitTime_" + prefix, userState.lastHabitTime);
        }

        userState.healthScore = Math.min(100, userState.healthScore + 4);
        localStorage.setItem("hepaHealthScore_" + prefix, userState.healthScore);

        userState.alertsLog.push({
            id: Date.now(),
            type: type,
            time: timeStr,
            status: 'completed',
            title: type === 'water' ? (isEs ? "Hidratación" : "Hydration") : (isEs ? "Pausa Activa" : "Active Break")
        });

        playWebAudioTone('success');
        showToast(
            "HepaCoach AI", 
            isEs ? "¡Excelente! Has cumplido y ganado +4 puntos de Score." : "Great job! You complied and gained +4 Score points.", 
            "success"
        );
    } else if (action === 'skip') {
        if (type === 'water') {
            userState.lastWaterTime = now;
            localStorage.setItem("hepaLastWaterTime_" + prefix, userState.lastWaterTime);
        } else {
            userState.lastHabitTime = now;
            localStorage.setItem("hepaLastHabitTime_" + prefix, userState.lastHabitTime);
        }

        userState.healthScore = Math.max(30, userState.healthScore - 3);
        localStorage.setItem("hepaHealthScore_" + prefix, userState.healthScore);

        userState.alertsLog.push({
            id: Date.now(),
            type: type,
            time: timeStr,
            status: 'skipped',
            title: type === 'water' ? (isEs ? "Hidratación" : "Hydration") : (isEs ? "Pausa Activa" : "Active Break")
        });

        playWebAudioTone('warning');
        showToast(
            "HepaCoach AI", 
            isEs ? "Alerta omitida. Penalización de -3 puntos de Score." : "Alert skipped. Penalty of -3 Score points.", 
            "danger"
        );
    } else if (action === 'snooze') {
        // snooze duration: simulation = 30s, real = 5 mins (300,000ms)
        const snoozeDuration = userState.simulationMode ? 30000 : 300000;
        const threshold = userState.simulationMode ? 60000 : 10800000;

        if (type === 'water') {
            userState.lastWaterTime = now - (threshold - snoozeDuration);
            localStorage.setItem("hepaLastWaterTime_" + prefix, userState.lastWaterTime);
        } else {
            const habitThreshold = userState.simulationMode ? 90000 : 7200000;
            userState.lastHabitTime = now - (habitThreshold - snoozeDuration);
            localStorage.setItem("hepaLastHabitTime_" + prefix, userState.lastHabitTime);
        }

        userState.alertsLog.push({
            id: Date.now(),
            type: type,
            time: timeStr,
            status: 'snoozed',
            title: type === 'water' ? (isEs ? "Hidratación (Pospuesta)" : "Hydration (Snoozed)") : (isEs ? "Pausa (Pospuesta)" : "Break (Snoozed)")
        });

        playWebAudioTone('snooze');
        showToast(
            "HepaCoach AI", 
            isEs ? "Alerta pospuesta. Te recordaré pronto." : "Alert snoozed. I will remind you soon.", 
            "warning"
        );
    }

    if (userState.alertsLog.length > 8) {
        userState.alertsLog.shift();
    }
    localStorage.setItem("hepaAlertsLog_" + prefix, JSON.stringify(userState.alertsLog));

    updateDashboardUI();
    renderAlertTimeline();
    renderWeeklyChart();
}

function renderAlertTimeline() {
    const container = document.getElementById("alert-compliance-timeline");
    if (!container) return;

    if (userState.alertsLog.length === 0) {
        container.innerHTML = `<div class="food-log-empty">${userState.lang === 'es' ? 'Sin historial de alertas hoy.' : 'No alert history today.'}</div>`;
        return;
    }

    const isEs = userState.lang === 'es';
    
    const html = [...userState.alertsLog].reverse().map(log => {
        let icon = log.type === 'water' ? "💧" : "⏱️";
        let statusText = "";
        let badgeClass = log.status;
        
        if (log.status === 'completed') statusText = isEs ? "Cumplido" : "Completed";
        else if (log.status === 'skipped') statusText = isEs ? "Omitido" : "Skipped";
        else statusText = isEs ? "Pospuesto" : "Snoozed";

        return `
            <div class="timeline-item">
                <div class="timeline-badge ${badgeClass}">${icon}</div>
                <div class="timeline-info">
                    <div>
                        <span class="timeline-title">${log.title}</span>
                        <span class="timeline-time">${log.time}</span>
                    </div>
                    <span class="timeline-status ${badgeClass}">${statusText}</span>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// --- FOOD CATEGORY FILTERS ---
function setFoodCategory(cat) {
    userState.currentFoodCategory = cat;
    document.querySelectorAll(".food-filter-btn").forEach(btn => {
        btn.classList.toggle("active", btn.id === `food-filter-${cat}`);
    });
    renderFoodGrid();
}

// --- FOOD LOGGING LOGIC ---
function addFoodToLog(foodId) {
    if (!userState.user) return;
    const prefix = userState.user.username;
    
    const foods = foodDatabase[userState.lang][userState.currentBudget];
    const food = foods.find(f => f.id === foodId);
    if (!food) return;

    const logEntry = {
        logId: Date.now(),
        id: food.id,
        name: food.name,
        icon: food.icon,
        kcal: food.kcal,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        points: food.points,
        time: new Date().toLocaleTimeString(userState.lang === 'es' ? 'es-ES' : 'en-US', {hour: '2-digit', minute:'2-digit'})
    };

    userState.dailyFoodLog.push(logEntry);
    localStorage.setItem("hepaFoodLog_" + prefix, JSON.stringify(userState.dailyFoodLog));

    // Update Liver Score
    userState.healthScore = Math.min(100, userState.healthScore + (food.points || 3));
    localStorage.setItem("hepaHealthScore_" + prefix, userState.healthScore);

    playWebAudioTone('success');
    showToast(
        userState.lang === 'es' ? "Comida Registrada" : "Food Logged", 
        userState.lang === 'es' 
            ? `Has comido ${food.name}. +${food.points} pts Score Hepático.` 
            : `Logged ${food.name}. +${food.points} pts Liver Score.`, 
        "success"
    );

    updateDashboardUI();
    updateFoodMetricsUI();
    renderFoodLog();
    renderWeeklyChart();
}

function removeFoodFromLog(logId) {
    if (!userState.user) return;
    const prefix = userState.user.username;

    const idx = userState.dailyFoodLog.findIndex(item => item.logId === logId);
    if (idx === -1) return;

    const item = userState.dailyFoodLog[idx];
    userState.healthScore = Math.max(30, userState.healthScore - (item.points || 3));
    localStorage.setItem("hepaHealthScore_" + prefix, userState.healthScore);

    userState.dailyFoodLog.splice(idx, 1);
    localStorage.setItem("hepaFoodLog_" + prefix, JSON.stringify(userState.dailyFoodLog));

    showToast(
        userState.lang === 'es' ? "Comida Eliminada" : "Food Removed", 
        userState.lang === 'es' ? "Alimento removido de tu registro." : "Food removed from your log.", 
        "warning"
    );

    updateDashboardUI();
    updateFoodMetricsUI();
    renderFoodLog();
    renderWeeklyChart();
}

function clearFoodLog() {
    if (!userState.user) return;
    const prefix = userState.user.username;

    userState.dailyFoodLog = [];
    localStorage.setItem("hepaFoodLog_" + prefix, JSON.stringify(userState.dailyFoodLog));

    showToast(
        userState.lang === 'es' ? "Registro Limpio" : "Log Cleared", 
        userState.lang === 'es' ? "Se ha limpiado tu registro de comidas de hoy." : "Today's food log cleared.", 
        "info"
    );

    updateDashboardUI();
    updateFoodMetricsUI();
    renderFoodLog();
}

function updateFoodMetricsUI() {
    let totalKcal = 0, totalProtein = 0, totalCarbs = 0, totalFat = 0, totalPoints = 0;
    
    userState.dailyFoodLog.forEach(item => {
        totalKcal += item.kcal || 0;
        totalProtein += item.protein || 0;
        totalCarbs += item.carbs || 0;
        totalFat += item.fat || 0;
        totalPoints += item.points || 0;
    });

    const kcalText = document.getElementById("logged-kcal");
    const proteinText = document.getElementById("logged-protein");
    const carbsText = document.getElementById("logged-carbs");
    const fatText = document.getElementById("logged-fat");
    const pointsBadge = document.getElementById("food-points-badge");

    if (kcalText) kcalText.textContent = `${totalKcal} / 2000 kcal`;
    if (proteinText) proteinText.textContent = `${totalProtein} / 80g`;
    if (carbsText) carbsText.textContent = `${totalCarbs} / 220g`;
    if (fatText) fatText.textContent = `${totalFat} / 65g`;
    if (pointsBadge) pointsBadge.textContent = `+${totalPoints} HepaPts`;

    const fillKcal = document.getElementById("progress-kcal-fill");
    const fillProtein = document.getElementById("progress-protein-fill");
    const fillCarbs = document.getElementById("progress-carbs-fill");
    const fillFat = document.getElementById("progress-fat-fill");

    if (fillKcal) fillKcal.style.width = `${Math.min(100, (totalKcal / 2000) * 100)}%`;
    if (fillProtein) fillProtein.style.width = `${Math.min(100, (totalProtein / 80) * 100)}%`;
    if (fillCarbs) fillCarbs.style.width = `${Math.min(100, (totalCarbs / 220) * 100)}%`;
    if (fillFat) fillFat.style.width = `${Math.min(100, (totalFat / 65) * 100)}%`;
}

function renderFoodLog() {
    const list = document.getElementById("food-log-list");
    if (!list) return;

    if (userState.dailyFoodLog.length === 0) {
        list.innerHTML = `<div class="food-log-empty">${userState.lang === 'es' ? 'No has registrado alimentos hoy.' : 'You haven\'t logged any food today.'}</div>`;
        return;
    }

    list.innerHTML = userState.dailyFoodLog.map(item => `
        <div class="logged-food-row">
            <div class="logged-food-info">
                <span style="font-size: 1.25rem; margin-right: 0.25rem;">${item.icon}</span>
                <div>
                    <strong>${item.name}</strong>
                    <p style="font-size: 0.65rem; color: var(--text-muted); margin: 0;">${item.time} | P: ${item.protein}g C: ${item.carbs}g G: ${item.fat}g</p>
                </div>
            </div>
            <div class="logged-food-meta">
                <span class="logged-food-kcal">${item.kcal} kcal</span>
                <button class="logged-food-del" onclick="removeFoodFromLog(${item.logId})">&times;</button>
            </div>
        </div>
    `).join('');
}

// --- WEEKLY NUTRITION PLAN ---
const weeklyNutritionGoals = {
    es: [
        { day: "Lunes", goal: "💧 Beber 2 tazas de Té Verde purificador" },
        { day: "Martes", goal: "🐟 Consumir Salmón u Omega-3 hepático" },
        { day: "Miércoles", goal: "🌾 Fibra activa: Avena integral al desayuno" },
        { day: "Jueves", goal: "🧄 Añadir ajo crudo picado a tus comidas" },
        { day: "Viernes", goal: "🥦 Brócoli o crucíferas al vapor" },
        { day: "Sábado", goal: "🍋 Cucharada de oliva con zumo de limón" },
        { day: "Domingo", goal: "🍵 Infusión de Cardo Mariano desintoxicante" }
    ],
    en: [
        { day: "Monday", goal: "💧 Drink 2 cups of purifying Green Tea" },
        { day: "Tuesday", goal: "🐟 Eat Salmon or clean Omega-3 fats" },
        { day: "Wednesday", goal: "🌾 Active fiber: Whole oats for breakfast" },
        { day: "Thursday", goal: "🧄 Add chopped raw garlic to meals" },
        { day: "Friday", goal: "🥦 Eat steamed broccoli or cruciferous veg" },
        { day: "Saturday", goal: "🍋 Spoon of olive oil with lemon juice" },
        { day: "Sunday", goal: "🍵 Detoxifying Milk Thistle infusion" }
    ]
};

function renderWeeklyNutritionPlan() {
    const grid = document.getElementById("weekly-nutrition-plan");
    if (!grid) return;

    const lang = userState.lang;
    const goals = weeklyNutritionGoals[lang];

    grid.innerHTML = goals.map((item, idx) => {
        const isCompleted = userState.weeklyNutritionCompleted[idx];
        return `
            <div class="weekly-nutrition-day ${isCompleted ? 'completed' : ''}">
                <div class="weekly-nutrition-day-header">
                    <span class="day-name">${item.day}</span>
                    <input type="checkbox" class="day-checkbox" ${isCompleted ? 'checked' : ''} onchange="toggleWeeklyNutritionDay(${idx}, this.checked)">
                </div>
                <p class="day-goal-text">${item.goal}</p>
            </div>
        `;
    }).join('');
}

function toggleWeeklyNutritionDay(idx, checked) {
    if (!userState.user) return;
    const prefix = userState.user.username;

    userState.weeklyNutritionCompleted[idx] = checked;
    localStorage.setItem("hepaWeeklyNutrition_" + prefix, JSON.stringify(userState.weeklyNutritionCompleted));

    const points = 2;
    if (checked) {
        userState.healthScore = Math.min(100, userState.healthScore + points);
        playWebAudioTone('success');
        showToast(
            userState.lang === 'es' ? "Reto Completado" : "Challenge Completed", 
            userState.lang === 'es' ? "¡Muy bien! Reto nutricional completado. +2 pts." : "Great! Nutrition challenge completed. +2 pts.", 
            "success"
        );
    } else {
        userState.healthScore = Math.max(30, userState.healthScore - points);
        showToast(
            userState.lang === 'es' ? "Reto Desmarcado" : "Challenge Unchecked", 
            userState.lang === 'es' ? "Se restaron los puntos del reto." : "Challenge points deducted.", 
            "warning"
        );
    }
    
    localStorage.setItem("hepaHealthScore_" + prefix, userState.healthScore);

    updateDashboardUI();
    renderWeeklyNutritionPlan();
    renderWeeklyChart();
}

// Scheduler is started in checkSession() after confirmed login
