// Lógica JavaScript para o Villain LinkedIn

document.addEventListener('DOMContentLoaded', () => {
    const navFeed = document.getElementById('nav-feed');
    const navProfile = document.getElementById('nav-profile');
    const navJobs = document.getElementById('nav-jobs');
    const navAuth = document.getElementById('nav-auth');
    const navLogout = document.getElementById('nav-logout');

    const authSection = document.getElementById('auth-section');
    const feedSection = document.getElementById('feed-section');
    const profileSection = document.getElementById('profile-section');
    const jobsSection = document.getElementById('jobs-section');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const submitPostButton = document.getElementById('submit-post');
    const postContentTextarea = document.getElementById('post-content');
    const postsList = document.getElementById('posts-list');

    // Elementos do Perfil
    const profilePic = document.getElementById('profile-pic');
    const profileVillainName = document.getElementById('profile-villain-name');
    const editVillainName = document.getElementById('edit-villain-name');
    const editProfilePicUrl = document.getElementById('edit-profile-pic-url');
    const editAbilities = document.getElementById('edit-abilities');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profileAbilitiesList = document.getElementById('profile-abilities-list');

    // Elementos de Vagas
    const jobsList = document.getElementById('jobs-list');


    let loggedInUser = null; // Simula o usuário logado

    // --- Dados Mock (simulando um banco de dados) ---
    let mockPosts = [
        {
            id: 1,
            author: 'Darth Vader',
            content: 'Acabei de construir uma nova Estrela da Morte. Quem quer testar o raio laser?',
            skulls: 15,
            date: '2024-07-20 10:30',
            timestamp: new Date('2024-07-20T10:30:00').getTime(),
            skulledBy: ['Loki', 'Malévola']
        },
        {
            id: 2,
            author: 'Coringa',
            content: 'Por que tão sérios? Acabei de pintar Gotham de roxo. HAHAHA!',
            skulls: 22,
            date: '2024-07-19 18:00',
            timestamp: new Date('2024-07-19T18:00:00').getTime(),
            skulledBy: ['Darth Vader']
        },
        {
            id: 3,
            author: 'Malévola',
            content: 'Transformei mais um príncipe em sapo. A rotina de uma vilã nunca para.',
            skulls: 10,
            date: '2024-07-19 09:00',
            timestamp: new Date('2024-07-19T09:00:00').getTime(),
            skulledBy: []
        }
    ];

    let mockUserProfile = {
        name: 'Vilão Padrão',
        profilePic: 'https://via.placeholder.com/150/ff0000/ffffff?text=Vilao',
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
            navFeed.style.display = 'none'; // Esconde feed se não logado
            navProfile.style.display = 'none'; // Esconde perfil se não logado
            navJobs.style.display = 'none'; // Esconde vagas se não logado
        }
    }

    // --- Funções de Postagens ---
    function createPostElement(post) {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.dataset.postId = post.id; // Para identificar a postagem

        postCard.innerHTML = `
            <div class="author">${post.author}</div>
            <div class="content">${post.content}</div>
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
        postsList.innerHTML = ''; // Limpa o feed
        // Ordena as postagens da mais recente para a mais antiga
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
            // Simula a lógica de curtir/descurtir
            const userHasSkulled = post.skulledBy.includes(loggedInUser.name);
            if (userHasSkulled) {
                post.skulls--;
                post.skulledBy = post.skulledBy.filter(name => name !== loggedInUser.name);
            } else {
                post.skulls++;
                post.skulledBy.push(loggedInUser.name);
            }
            renderPosts(); // Re-renderiza para atualizar a contagem
        }
    }

    // --- Funções de Perfil ---
    function loadProfile() {
        profilePic.src = mockUserProfile.profilePic;
        profileVillainName.textContent = mockUserProfile.name;
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
        if (loggedInUser && loggedInUser.name === profileVillainName.textContent) {
            loggedInUser.name = mockUserProfile.name;
        }

        alert('Perfil atualizado com sucesso!');
        loadProfile(); // Recarrega o perfil para exibir as mudanças
    });

    // --- Funções de Vagas ---
    function createJobElement(job) {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');

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
        jobsList.innerHTML = ''; // Limpa a lista de vagas
        mockJobs.forEach(job => {
            jobsList.appendChild(createJobElement(job));
        });
    }


    // --- Inicialização ---
    updateNavVisibility(); // Atualiza a navegação ao carregar a página
    showSection(authSection); // Começa na seção de autenticação

    // Event Listeners para a navegação
    navFeed.addEventListener('click', (e) => {
        e.preventDefault();
        if (loggedInUser) {
            showSection(feedSection);
            renderPosts(); // Renderiza as postagens ao ir para o feed
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
            renderJobs(); // Carrega as vagas ao ir para a seção
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
        loggedInUser = null; // Desloga o usuário
        alert('Você foi desconectado!');
        updateNavVisibility();
        showSection(authSection);
    });


    // --- Lógica de Autenticação (placeholders) ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const villainName = document.getElementById('login-villain-name').value;
        const password = document.getElementById('login-password').value;

        // Simulação de login
        if (villainName && password) { // Apenas verifica se não está vazio
            loggedInUser = { name: villainName, id: Date.now() }; // Simula um usuário logado
            mockUserProfile.name = villainName; // Define o nome do perfil para o usuário logado
            alert(`Login do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            showSection(feedSection);
            renderPosts(); // Renderiza as postagens após o login
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
            // Em um projeto real, você registraria o usuário no backend
            loggedInUser = { name: villainName, id: Date.now() }; // Simula um usuário logado
            mockUserProfile.name = villainName; // Define o nome do perfil para o usuário registrado
            alert(`Registro do vilão ${villainName} simulado com sucesso!`);
            updateNavVisibility();
            showSection(feedSection);
            renderPosts(); // Renderiza as postagens após o registro
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
            content: postContent,
            skulls: 0,
            date: new Date().toLocaleString('pt-BR'),
            timestamp: Date.now(),
            skulledBy: []
        };

        mockPosts.push(newPost);
        renderPosts(); // Re-renderiza o feed com a nova postagem
        postContentTextarea.value = ''; // Limpa o campo
    });
});
