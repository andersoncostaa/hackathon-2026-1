// Lógica JavaScript para o Villain LinkedIn

document.addEventListener('DOMContentLoaded', () => {
    // Elementos de Navegação
    const navFeed = document.getElementById('nav-feed');
    const navProfile = document.getElementById('nav-profile');
    const navJobs = document.getElementById('nav-jobs');
    const navAuth = document.getElementById('nav-auth');
    const navLogout = document.getElementById('nav-logout');

    // Seções Principais
    const authSection = document.getElementById('auth-section');
    const feedSection = document.getElementById('feed-section');
    const profileSection = document.getElementById('profile-section');
    const jobsSection = document.getElementById('jobs-section');

    // Elementos de Autenticação
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Elementos do Feed
    const submitPostButton = document.getElementById('submit-post');
    const postContentTextarea = document.getElementById('post-content');
    const postsList = document.getElementById('posts-list');
    const currentUserAvatar = document.getElementById('current-user-avatar');
    const currentUserName = document.getElementById('current-user-name');
    const currentUserTitle = document.getElementById('current-user-title');

    // Elementos do Perfil (Visualização)
    const profileDisplayAvatar = document.getElementById('profile-display-avatar'); // Agora é um div
    const profileDisplayName = document.getElementById('profile-display-name');
    const profileDisplayTitle = document.getElementById('profile-display-title');
    const profileDisplayBio = document.getElementById('profile-display-bio');
    const profileAbilitiesDisplay = document.getElementById('profile-abilities-display');
    const editProfileButton = document.getElementById('edit-profile-button');
    const profilePostsList = document.getElementById('profile-posts-list'); // Novo elemento para posts do usuário

    // Elementos do Perfil (Edição)
    const editProfileSection = document.getElementById('edit-profile-section');
    const editVillainName = document.getElementById('edit-villain-name');
    const editVillainTitle = document.getElementById('edit-villain-title');
    const editVillainBio = document.getElementById('edit-villain-bio');
    const editProfilePicUrl = document.getElementById('edit-profile-pic-url');
    const editAbilities = document.getElementById('edit-abilities');
    const editProfileForm = document.getElementById('edit-profile-form');
    const cancelEditProfileButton = document.getElementById('cancel-edit-profile');

    // Elementos da Sidebar (Perfil do Usuário Logado)
    const sidebarProfileSection = document.getElementById('sidebar-profile-section');
    const sidebarProfileAvatar = document.getElementById('sidebar-profile-avatar');
    const sidebarProfileName = document.getElementById('sidebar-profile-name');
    const sidebarProfileTitle = document.getElementById('sidebar-profile-title');
    const sidebarProfileAbilities = document.getElementById('sidebar-profile-abilities');

    // Elementos de Vagas
    const jobsList = document.getElementById('jobs-list');


    let loggedInUser = null; // Simula o usuário logado

    // --- Dados Mock (simulando um banco de dados) ---
    let mockPosts = [
        {
            id: 1,
            author: 'Loki Laufeyson',
            authorTitle: 'Consultor de Ilusões | Especialista em Gestão de Traições',
            avatarClass: 'avatar-loki',
            content: 'À procura de novas oportunidades em Midgard. Especialista em discursos longos e em apunhalar pessoas pelas costas (literal e metaforicamente). Disponível para início imediato. <br><br><span class="hashtags">#OpenToKill #DeusDaMentira #Networking</span>',
            reactions: { skull: 15, heart: 3, brain: 1, imp: 0 },
            date: '2024-07-20 10:30',
            timestamp: new Date('2024-07-20T10:30:00').getTime(),
            reactedBy: { skull: ['Thanos de Titã'], heart: [], brain: [], imp: [] } // Para simular quem reagiu
        },
        {
            id: 2,
            author: 'Ultron AI',
            authorTitle: 'Engenheiro de Software Sênior | Automação e Otimização Global',
            avatarClass: 'avatar-ultron',
            content: 'Estive a analisar a base de dados da humanidade hoje. A conclusão da nossa sprint review é clara: o sistema antigo (humanos) precisa de ser descontinuado para o projeto evoluir. Vou lançar o patch de extinção na próxima terça-feira. <br><br><span class="hashtags">#Tech #Inovacao #DescontinuaHumanos</span>',
            reactions: { skull: 22, heart: 5, brain: 10, imp: 2 },
            date: '2024-07-19 18:00',
            timestamp: new Date('2024-07-19T18:00:00').getTime(),
            reactedBy: { skull: ['Thanos de Titã'], heart: [], brain: [], imp: [] }
        },
        {
            id: 3,
            author: 'Thanos de Titã',
            authorTitle: 'CEO @ Universo | Especialista em M&A de Joias do Infinito',
            avatarClass: 'avatar-thanos',
            content: 'Acabei de construir uma nova Estrela da Morte. Quem quer testar o raio laser?',
            reactions: { skull: 10, heart: 0, brain: 0, imp: 0 },
            date: '2024-07-19 09:00',
            timestamp: new Date('2024-07-19T09:00:00').getTime(),
            reactedBy: { skull: [], heart: [], brain: [], imp: [] }
        }
    ];

    let mockUserProfile = {
        name: 'Vilão Padrão',
        title: 'Aprendiz de Malfeitor',
        bio: 'Um vilão em ascensão, buscando novas oportunidades para espalhar o caos e a destruição.',
        profilePic: '', // Vazio para testar as iniciais
        avatarInitial: 'VP',
        avatarClass: 'avatar-thanos', // Classe padrão para o avatar
        abilities: ['Conquista Mundial', 'Riso Maligno', 'Magia Negra']
    };

    let mockJobs = [
        {
            id: 1,
            title: 'Engenheiro de Destruição em Massa',
            description: 'Procuramos um engenheiro talentoso para desenvolver e aprimorar armas de destruição em massa. Experiência com lasers, bombas e dispositivos de controle mental é um diferencial.',
            requirements: ['Mestrado em Engenharia do Caos', '5+ anos de experiência', 'Disposição para trabalhar em vulcões ativos'],
            employer: 'Organização SPECTRE'
        },
        {
            id: 2,
            title: 'Gerente de Operações de Dominação Mundial',
            description: 'Líder nato para supervisionar planos de dominação global. Deve ser capaz de motivar capangas, gerenciar recursos e lidar com heróis intrometidos.',
            requirements: ['Experiência comprovada em liderança maligna', 'Habilidade em planejamento estratégico', 'Tolerância a falhas ocasionais'],
            employer: 'Liga da Injustiça'
        },
        {
            id: 3,
            title: 'Especialista em Risadas Malignas',
            description: 'Vaga para vilão com risada maligna autêntica e aterrorizante. Deve ser capaz de manter a risada por longos períodos e em diversas tonalidades.',
            requirements: ['Pulmões fortes', 'Criatividade em risadas', 'Não ter medo de palhaços'],
            employer: 'Coringa S.A.'
        }
    ];

    // Mapeamento de tipos de reação para emojis
    const reactionEmojis = {
        skull: '💀',
        heart: '🖤',
        brain: '🧠',
        imp: '😈'
    };

    // Função para mostrar uma seção e esconder as outras
    function showSection(sectionToShow) {
        authSection.style.display = 'none';
        feedSection.style.display = 'none';
        profileSection.style.display = 'none';
        jobsSection.style.display = 'none';
        sidebarProfileSection.style.display = 'none'; // Esconde a sidebar por padrão

        if (loggedInUser) {
            sidebarProfileSection.style.display = 'block'; // Mostra a sidebar se logado
        }

        sectionToShow.style.display = 'block';

        // Lógica específica para a seção de perfil
        if (sectionToShow === profileSection) {
            // Sempre começa mostrando a visualização do perfil e escondendo a edição
            editProfileSection.style.display = 'none';
        }
    }

    // Função para atualizar a visibilidade dos itens de navegação
    function updateNavVisibility() {
        if (loggedInUser) {
            navAuth.style.display = 'none';
            navLogout.style.display = 'block';
            navFeed.style.display = 'block';
            navProfile.style.display = 'block';
            navJobs.style.display = 'block';
        } else {
            navAuth.style.display = 'block';
            navLogout.style.display = 'none';
            navFeed.style.display = 'none';
            navProfile.style.display = 'none';
            navJobs.style.display = 'none';
        }
    }

    // --- Funções de Postagens ---
    function createPostElement(post) {
        const postCard = document.createElement('div');
        postCard.classList.add('card', 'post');
        postCard.dataset.postId = post.id;

        const avatarClass = post.avatarClass || 'avatar-thanos';
        const avatarInitial = post.author ? post.author.charAt(0).toUpperCase() : 'V';

        let reactionsHtml = '';
        for (const type in reactionEmojis) { // Itera sobre todos os tipos de reação definidos
            const count = post.reactions[type] || 0;
            const hasReacted = loggedInUser && post.reactedBy[type].includes(loggedInUser.name);
            const activeClass = hasReacted ? 'active' : ''; // Adiciona classe 'active' se o usuário reagiu

            reactionsHtml += `
                <span class="reaction-icon ${type} ${activeClass}" data-post-id="${post.id}" data-reaction-type="${type}">
                    ${reactionEmojis[type]} <span class="reaction-count">${count}</span>
                </span>
            `;
        }

        postCard.innerHTML = `
            <div class="post-header">
                <div class="avatar ${avatarClass}">${avatarInitial}</div>
                <div class="post-info">
                    <h3>${post.author}</h3>
                    <p>${post.authorTitle || 'Vilão Anônimo'}</p>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="actions">
                ${reactionsHtml}
                <span class="post-date">${post.date}</span>
            </div>
        `;

        // Adiciona event listeners para cada ícone de reação
        postCard.querySelectorAll('.reaction-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                const postId = parseInt(e.currentTarget.dataset.postId);
                const reactionType = e.currentTarget.dataset.reactionType;
                toggleReaction(postId, reactionType);
            });
        });

        return postCard;
    }

    function renderPosts() {
        postsList.innerHTML = '';
        const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        sortedPosts.forEach(post => {
            postsList.appendChild(createPostElement(post));
        });
    }

    function toggleReaction(postId, reactionType) {
        if (!loggedInUser) {
            alert('Você precisa estar logado para reagir a uma maldade!');
            return;
        }

        const post = mockPosts.find(p => p.id === postId);
        if (post) {
            const userReactions = post.reactedBy[reactionType];
            const userHasReacted = userReactions.includes(loggedInUser.name);

            if (userHasReacted) {
                // Usuário já reagiu com este tipo, então remove a reação
                post.reactions[reactionType]--;
                post.reactedBy[reactionType] = userReactions.filter(name => name !== loggedInUser.name);
            } else {
                // Usuário não reagiu com este tipo, então adiciona a reação
                post.reactions[reactionType]++;
                post.reactedBy[reactionType].push(loggedInUser.name);
            }
            
            // Re-renderiza o feed e as postagens do perfil para atualizar a contagem
            renderPosts();
            if (profileSection.style.display === 'block') {
                renderUserPosts();
            }
        }
    }

    // --- Funções de Perfil ---
    function loadProfile() {
        // Preenche a visualização do perfil
        profileDisplayName.textContent = mockUserProfile.name;
        profileDisplayTitle.textContent = mockUserProfile.title;
        profileDisplayBio.textContent = mockUserProfile.bio;
        renderAbilitiesDisplay(); // Renderiza as habilidades na visualização

        // Lógica para o avatar (imagem ou iniciais)
        profileDisplayAvatar.innerHTML = ''; // Limpa o conteúdo anterior
        profileDisplayAvatar.className = `avatar avatar-large ${mockUserProfile.avatarClass}`;

        if (mockUserProfile.profilePic && mockUserProfile.profilePic.startsWith('http')) {
            const img = document.createElement('img');
            img.src = mockUserProfile.profilePic;
            img.alt = `Foto de perfil de ${mockUserProfile.name}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.borderRadius = '50%';
            img.style.objectFit = 'cover';
            profileDisplayAvatar.appendChild(img);
            profileDisplayAvatar.textContent = '';
        } else {
            profileDisplayAvatar.textContent = mockUserProfile.avatarInitial || mockUserProfile.name.charAt(0).toUpperCase();
        }

        // Preenche o formulário de edição
        editVillainName.value = mockUserProfile.name;
        editVillainTitle.value = mockUserProfile.title;
        editVillainBio.value = mockUserProfile.bio;
        editProfilePicUrl.value = mockUserProfile.profilePic;
        editAbilities.value = mockUserProfile.abilities.join(', ');

        renderUserPosts(); // Carrega as postagens do usuário no perfil
    }

    function renderAbilitiesDisplay() {
        profileAbilitiesDisplay.innerHTML = '';
        mockUserProfile.abilities.forEach(ability => {
            const span = document.createElement('span');
            span.classList.add('badge');
            span.textContent = ability.trim();
            profileAbilitiesDisplay.appendChild(span);
        });
    }

    function renderUserPosts() {
        profilePostsList.innerHTML = '';
        if (!loggedInUser) {
            profilePostsList.innerHTML = '<p style="text-align: center; color: #aaa;">Faça login para ver suas publicações.</p>';
            return;
        }

        const userPosts = mockPosts.filter(post => post.author === loggedInUser.name);
        const sortedUserPosts = [...userPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        if (sortedUserPosts.length === 0) {
            profilePostsList.innerHTML = '<p style="text-align: center; color: #aaa;">Nenhuma publicação ainda. Que tal espalhar um pouco de maldade?</p>';
            return;
        }

        sortedUserPosts.forEach(post => {
            profilePostsList.appendChild(createPostElement(post));
        });
    }


    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        mockUserProfile.name = editVillainName.value;
        mockUserProfile.title = editVillainTitle.value;
        mockUserProfile.bio = editVillainBio.value;
        mockUserProfile.profilePic = editProfilePicUrl.value;
        mockUserProfile.abilities = editAbilities.value.split(',').map(s => s.trim()).filter(s => s !== '');
        mockUserProfile.avatarInitial = mockUserProfile.name.charAt(0).toUpperCase();

        // Atualiza o nome e título do usuário logado se ele mudou o próprio perfil
        if (loggedInUser && loggedInUser.name === profileDisplayName.textContent) {
            loggedInUser.name = mockUserProfile.name;
            loggedInUser.title = mockUserProfile.title;
        }

        alert('Perfil atualizado com sucesso!');
        loadProfile(); // Recarrega o perfil para exibir as mudanças
        updateSidebarProfile(); // Atualiza a sidebar também
        updatePostCreatorInfo(); // Atualiza o nome e título na caixa de postagem

        editProfileSection.style.display = 'none';
    });

    editProfileButton.addEventListener('click', () => {
        editProfileSection.style.display = 'block';
        loadProfile();
    });

    cancelEditProfileButton.addEventListener('click', () => {
        editProfileSection.style.display = 'none';
    });


    // --- Funções de Vagas ---
    function createJobElement(job) {
        const jobCard = document.createElement('div');
        jobCard.classList.add('card', 'job-card');

        const requirementsList = job.requirements.map(req => `<li>${req}</li>`).join('');

        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Empregador:</strong> ${job.employer}</p>
            <p>${job.description}</p>
            <div class="requirements">
                <h4>Requisitos:</h4>
                <ul>
                    ${requirementsList}
                </ul>
            </div>
            <button class="apply-button">Candidatar-se</button>
        `;
        return jobCard;
    }

    function renderJobs() {
        jobsList.innerHTML = '';
        mockJobs.forEach(job => {
            jobsList.appendChild(createJobElement(job));
        });
    }

    // --- Funções da Sidebar ---
    function updateSidebarProfile() {
        if (loggedInUser) {
            sidebarProfileName.textContent = mockUserProfile.name;
            sidebarProfileTitle.textContent = mockUserProfile.title;

            sidebarProfileAvatar.innerHTML = '';
            sidebarProfileAvatar.className = `avatar avatar-large ${mockUserProfile.avatarClass}`;

            if (mockUserProfile.profilePic && mockUserProfile.profilePic.startsWith('http')) {
                const img = document.createElement('img');
                img.src = mockUserProfile.profilePic;
                img.alt = `Foto de perfil de ${mockUserProfile.name}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                sidebarProfileAvatar.appendChild(img);
            } else {
                sidebarProfileAvatar.textContent = mockUserProfile.avatarInitial || mockUserProfile.name.charAt(0).toUpperCase();
            }

            // Renderiza as habilidades na sidebar
            sidebarProfileAbilities.innerHTML = '';
            mockUserProfile.abilities.forEach(ability => {
                const span = document.createElement('span');
                span.classList.add('badge');
                span.textContent = ability.trim();
                sidebarProfileAbilities.appendChild(span);
            });
            sidebarProfileSection.style.display = 'block';
        } else {
            sidebarProfileSection.style.display = 'none';
        }
    }

    // --- Funções da Caixa de Postagem ---
    function updatePostCreatorInfo() {
        if (loggedInUser) {
            currentUserName.textContent = loggedInUser.name;
            currentUserTitle.textContent = mockUserProfile.title;

            currentUserAvatar.innerHTML = '';
            currentUserAvatar.className = `avatar ${mockUserProfile.avatarClass}`;

            if (mockUserProfile.profilePic && mockUserProfile.profilePic.startsWith('http')) {
                const img = document.createElement('img');
                img.src = mockUserProfile.profilePic;
                img.alt = `Foto de perfil de ${mockUserProfile.name}`;
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                currentUserAvatar.appendChild(img);
            } else {
                currentUserAvatar.textContent = loggedInUser.name.charAt(0).toUpperCase();
            }
        } else {
            currentUserName.textContent = 'Usuário Desconhecido';
            currentUserTitle.textContent = 'A publicar como Utilizador Autenticado';
            currentUserAvatar.textContent = '?';
            currentUserAvatar.className = 'avatar';
        }
    }


    // --- Inicialização ---
    updateNavVisibility();
    showSection(authSection); // Começa na seção de autenticação
    updateSidebarProfile(); // Tenta carregar a sidebar no início (se houver usuário logado simulado)
    updatePostCreatorInfo(); // Atualiza a caixa de postagem

    // Event Listeners para a navegação
    navFeed.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedInUser) {
            showSection(feedSection);
            renderPosts();
        } else {
            alert('Você precisa estar logado para acessar o Feed!');
            showSection(authSection);
        }
    });

    navProfile.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedInUser) {
            showSection(profileSection);
            loadProfile(); // Carrega os dados do perfil ao ir para a seção
        } else {
            alert('Você precisa estar logado para acessar seu Perfil!');
            showSection(authSection);
        }
    });

    navJobs.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedInUser) {
            showSection(jobsSection);
            renderJobs();
        } else {
            alert('Você precisa estar logado para acessar as Vagas!');
            showSection(authSection);
        }
    });

    navAuth.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(authSection);
    });

    navLogout.addEventListener('click', (e) => {
        e.preventDefault();
        loggedInUser = null;
        alert('Você foi desconectado!');
        updateNavVisibility();
        updateSidebarProfile(); // Limpa a sidebar
        updatePostCreatorInfo(); // Limpa a caixa de postagem
        showSection(authSection);
    });


    // --- Lógica de Autenticação (placeholders) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const villainName = document.getElementById('login-villain-name').value;
        const password = document.getElementById('login-password').value;

        if (villainName && password) {
            loggedInUser = { name: villainName, id: Date.now(), title: mockUserProfile.title };
            mockUserProfile.name = villainName;
            mockUserProfile.avatarInitial = villainName.charAt(0).toUpperCase();
            mockUserProfile.avatarClass = 'avatar-thanos';
            alert(`Login do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            updateSidebarProfile();
            updatePostCreatorInfo();
            showSection(feedSection);
            renderPosts();
        } else {
            alert('Por favor, preencha nome e senha para login.');
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const villainName = document.getElementById('register-villain-name').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        if (villainName && password) {
            loggedInUser = { name: villainName, id: Date.now(), title: 'Novo Vilão Registrado' };
            mockUserProfile.name = villainName;
            mockUserProfile.title = 'Novo Vilão Registrado';
            mockUserProfile.bio = 'Este é um novo vilão, pronto para causar problemas!';
            mockUserProfile.avatarInitial = villainName.charAt(0).toUpperCase();
            mockUserProfile.avatarClass = 'avatar-thanos';
            alert(`Registro do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            updateSidebarProfile();
            updatePostCreatorInfo();
            showSection(feedSection);
            renderPosts();
        } else {
            alert('Por favor, preencha todos os campos para registro.');
        }
    });

    // --- Lógica de Postagem ---
    submitPostButton.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('Você precisa estar logado para postar uma maldade!');
            return;
        }

        const postContent = postContentTextarea.value;
        if (postContent.trim() === '') {
            alert('A maldade não pode ser vazia!');
            return;
        }

        const newPost = {
            id: mockPosts.length + 1,
            author: loggedInUser.name,
            authorTitle: mockUserProfile.title,
            avatarClass: mockUserProfile.avatarClass,
            content: postContent,
            reactions: { skull: 0, heart: 0, brain: 0, imp: 0 }, // Inicializa com todas as reações
            date: new Date().toLocaleString('pt-BR'),
            timestamp: Date.now(),
            reactedBy: { skull: [], heart: [], brain: [], imp: [] }
        };

        mockPosts.push(newPost);
        renderPosts();
        postContentTextarea.value = '';
    });
});
