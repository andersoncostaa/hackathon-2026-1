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

    // Elementos do Perfil (Edição)
    const profilePic = document.getElementById('profile-pic');
    const profileVillainNameEdit = document.getElementById('profile-villain-name-edit');
    const editVillainName = document.getElementById('edit-villain-name');
    const editProfilePicUrl = document.getElementById('edit-profile-pic-url');
    const editAbilities = document.getElementById('edit-abilities');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profileAbilitiesList = document.getElementById('profile-abilities-list');

    // Elementos da Sidebar (Perfil do Usuário Logado)
    const sidebarProfileSection = document.getElementById('sidebar-profile-section');
    const sidebarProfileAvatar = document.getElementById('sidebar-profile-avatar');
    const sidebarProfileName = document.getElementById('sidebar-profile-name');
    const sidebarProfileTitle = document.getElementById('sidebar-profile-title'); // Novo elemento
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
            skulls: 15,
            date: '2024-07-20 10:30',
            timestamp: new Date('2024-07-20T10:30:00').getTime(),
            skulledBy: ['Thanos de Titã']
        },
        {
            id: 2,
            author: 'Ultron AI',
            authorTitle: 'Engenheiro de Software Sênior | Automação e Otimização Global',
            avatarClass: 'avatar-ultron',
            content: 'Estive a analisar a base de dados da humanidade hoje. A conclusão da nossa sprint review é clara: o sistema antigo (humanos) precisa de ser descontinuado para o projeto evoluir. Vou lançar o patch de extinção na próxima terça-feira. <br><br><span class="hashtags">#Tech #Inovacao #DescontinuaHumanos</span>',
            skulls: 22,
            date: '2024-07-19 18:00',
            timestamp: new Date('2024-07-19T18:00:00').getTime(),
            skulledBy: ['Thanos de Titã']
        },
        {
            id: 3,
            author: 'Thanos de Titã',
            authorTitle: 'CEO @ Universo | Especialista em M&A de Joias do Infinito',
            avatarClass: 'avatar-thanos',
            content: 'Acabei de construir uma nova Estrela da Morte. Quem quer testar o raio laser?',
            skulls: 10,
            date: '2024-07-19 09:00',
            timestamp: new Date('2024-07-19T09:00:00').getTime(),
            skulledBy: []
        }
    ];

    let mockUserProfile = {
        name: 'Vilão Padrão',
        title: 'Aprendiz de Malfeitor',
        profilePic: 'https://via.placeholder.com/150/ff0000/ffffff?text=VP',
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

        // Determina a classe do avatar ou usa uma padrão
        const avatarClass = post.avatarClass || 'avatar-thanos';
        const avatarInitial = post.author ? post.author.charAt(0).toUpperCase() : 'V';

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
                <span class="skull-icon" data-post-id="${post.id}">💀</span>
                <span class="skull-count">${post.skulls}</span>
                <span class="post-date">${post.date}</span>
            </div>
        `;

        const skullIcon = postCard.querySelector('.skull-icon');
        skullIcon.addEventListener('click', () => toggleSkull(post.id));

        return postCard;
    }

    function renderPosts() {
        postsList.innerHTML = '';
        const sortedPosts = [...mockPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        sortedPosts.forEach(post => {
            postsList.appendChild(createPostElement(post));
        });
    }

    function toggleSkull(postId) {
        if (!loggedInUser) {
            alert('Você precisa estar logado para curtir uma maldade!');
            return;
        }

        const post = mockPosts.find(p => p.id === postId);
        if (post) {
            const userHasSkulled = post.skulledBy.includes(loggedInUser.name);
            if (userHasSkulled) {
                post.skulls--;
                post.skulledBy = post.skulledBy.filter(name => name !== loggedInUser.name);
            } else {
                post.skulls++;
                post.skulledBy.push(loggedInUser.name);
            }
            renderPosts();
        }
    }

    // --- Funções de Perfil ---
    function loadProfile() {
        profilePic.src = mockUserProfile.profilePic;
        profileVillainNameEdit.textContent = mockUserProfile.name;
        editVillainName.value = mockUserProfile.name;
        editProfilePicUrl.value = mockUserProfile.profilePic;
        editAbilities.value = mockUserProfile.abilities.join(', ');
        renderAbilities();
    }

    function renderAbilities() {
        profileAbilitiesList.innerHTML = '';
        mockUserProfile.abilities.forEach(ability => {
            const li = document.createElement('li');
            li.textContent = ability.trim();
            profileAbilitiesList.appendChild(li);
        });
    }

    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        mockUserProfile.name = editVillainName.value;
        mockUserProfile.profilePic = editProfilePicUrl.value;
        mockUserProfile.abilities = editAbilities.value.split(',').map(s => s.trim()).filter(s => s !== '');

        // Atualiza o nome do usuário logado se ele mudou o próprio perfil
        if (loggedInUser && loggedInUser.name === profileVillainNameEdit.textContent) {
            loggedInUser.name = mockUserProfile.name;
        }

        alert('Perfil atualizado com sucesso!');
        loadProfile(); // Recarrega o perfil para exibir as mudanças
        updateSidebarProfile(); // Atualiza a sidebar também
        updatePostCreatorInfo(); // Atualiza o nome na caixa de postagem
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
            sidebarProfileTitle.textContent = mockUserProfile.title; // Usar o título do mockUserProfile
            sidebarProfileAvatar.textContent = mockUserProfile.avatarInitial || mockUserProfile.name.charAt(0).toUpperCase();
            sidebarProfileAvatar.className = `avatar avatar-large ${mockUserProfile.avatarClass}`; // Atualiza a classe do avatar

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
            // Limpa ou esconde a sidebar se não houver usuário logado
            sidebarProfileSection.style.display = 'none';
        }
    }

    // --- Funções da Caixa de Postagem ---
    function updatePostCreatorInfo() {
        if (loggedInUser) {
            currentUserName.textContent = loggedInUser.name;
            currentUserAvatar.textContent = loggedInUser.name.charAt(0).toUpperCase();
            currentUserAvatar.className = `avatar ${mockUserProfile.avatarClass}`; // Usa a classe do perfil logado
        } else {
            currentUserName.textContent = 'Usuário Desconhecido';
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
            loadProfile();
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
            loggedInUser = { name: villainName, id: Date.now() };
            mockUserProfile.name = villainName;
            mockUserProfile.avatarInitial = villainName.charAt(0).toUpperCase();
            mockUserProfile.avatarClass = 'avatar-thanos'; // Pode ser dinâmico no futuro
            alert(`Login do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            updateSidebarProfile(); // Atualiza a sidebar
            updatePostCreatorInfo(); // Atualiza a caixa de postagem
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
            loggedInUser = { name: villainName, id: Date.now() };
            mockUserProfile.name = villainName;
            mockUserProfile.avatarInitial = villainName.charAt(0).toUpperCase();
            mockUserProfile.avatarClass = 'avatar-thanos'; // Pode ser dinâmico no futuro
            alert(`Registro do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            updateSidebarProfile(); // Atualiza a sidebar
            updatePostCreatorInfo(); // Atualiza a caixa de postagem
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
            authorTitle: mockUserProfile.title, // Usa o título do perfil logado
            avatarClass: mockUserProfile.avatarClass, // Usa a classe do perfil logado
            content: postContent,
            skulls: 0,
            date: new Date().toLocaleString('pt-BR'),
            timestamp: Date.now(),
            skulledBy: []
        };

        mockPosts.push(newPost);
        renderPosts();
        postContentTextarea.value = '';
    });
});
