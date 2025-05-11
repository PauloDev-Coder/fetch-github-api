const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usúario" />
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                                <p>${user.bio ?? 'Não possui biografia cadastrada 😓'}</p>
                                <p>Seguidores: ${user.followers}</p>
                                <p>Seguindo: ${user.following}</p>
                            </div>
                        </div>`;

        let repositoriesItems = '';
        user.repositories.forEach(repo => {
            repositoriesItems += `
                <li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <p>⭐ Estrelas: ${repo.stargazers_count}</p>
                    <p>🍴 Forks: ${repo.forks_count}</p>
                    <p>👀 Watchers: ${repo.watchers_count}</p>
                    <p>💻 Linguagem: ${repo.language ?? 'Não especificada'}</p>
                </li>`;
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItems}</ul>
                                        </div>`;
        }

        let eventsItems = '';
        user.events.slice(0, 10).forEach(event => {
            if (event.type === 'PushEvent') {
                eventsItems += `<li>Repositório: ${event.repo.name} - Mensagem: ${event.payload.commits[0]?.message ?? 'Sem mensagem de commit'}</li>`;
            } else if (event.type === 'CreateEvent') {
                eventsItems += `<li>Repositório: ${event.repo.name} - Mensagem: Sem mensagem de commit</li>`;
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Últimos Eventos</h2>
                                            <ul>${eventsItems}</ul>
                                        </div>`;
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
};

export { screen };