const fs = require('fs');
const { waitForDebugger } = require('inspector');
const fetch = require('node-fetch');

const urlDefault = 'https://edusp-api.ip.tv';
const data = fs.readFileSync('creds.json', 'utf8');
const lista = JSON.parse(data);

async function login(user, pass) {
    const response = await fetch("https://sedintegracoes.educacao.sp.gov.br/credenciais/api/LoginCompletoToken", {
        method: "POST",
        headers: {
            "accept": "application/json, text/plain, */*",
            "content-type": "application/json",
            "ocp-apim-subscription-key": "2b03c1db3884488795f79c37c069381a"
        },
        body: JSON.stringify({ user, senha: pass })
    });

    if (!response.ok) {
        throw new Error(`Erro no login: ${response.status}`);
    }

    const data = await response.json();
    return data; // retorna o objeto completo
}

async function registrarToken(loginResponse) {
    const token = loginResponse.token || loginResponse.auth_token;
    if (!token) throw new Error("Token não encontrado no objeto de resposta");

    const response = await fetch(`${urlDefault}/registration/edusp/token`, {
        method: "POST",
        headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "x-api-platform": "webclient",
            "x-api-realm": "edusp"
        },
        body: JSON.stringify({ token })
    });

    if (!response.ok) {
        throw new Error(`Erro no registro: ${response.status}`);
    }

    return await response.json();
}

async function buscarTarefasPendentes(registro) {
    if (!registro?.nick || !registro?.auth_token || !registro?.realm) {
        throw new Error("Registro inválido: nick, auth_token ou realm ausentes.");
    }

    // targets fixos informados por você
    const baseTargets = [
        "r3fecffb9f4c2f1cea-l",
        "r6d3411fc08fcfc4ee-l",
        "r6faa4a6ef5cb327c9-l",
        "rc066934c1bcd8d71d-l",
        "1205", "1708", "762", "1582", "1712", "1182", "1717", "1216"
    ];

    // mesmos 4 targets de turma, agora específicos do usuário
    const userTargets = [
        `r3fecffb9f4c2f1cea-l:${registro.nick}`,
        `r6d3411fc08fcfc4ee-l:${registro.nick}`,
        `r6faa4a6ef5cb327c9-l:${registro.nick}`,
        `rc066934c1bcd8d71d-l:${registro.nick}`,
    ];

    const query = new URLSearchParams({
        expired_only: "false",
        limit: "100",
        offset: "0",
        filter_expired: "true",
        is_exam: "false",
        with_answer: "true",
        is_essay: "false",
        with_apply_moment: "true"
    });

    // múltiplos answer_statuses
    query.append("answer_statuses", "draft");
    query.append("answer_statuses", "pending");

    // múltiplos publication_target
    [...baseTargets, ...userTargets].forEach(t => query.append("publication_target", t));

    const headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-api-key": registro.auth_token,
        "x-api-platform": "webclient",
        "x-api-realm": registro.realm
    };

    const url = `https://edusp-api.ip.tv/tms/task/todo?${query.toString()}`;
    const resp = await fetch(url, { method: "GET", headers });

    if (!resp.ok) {
        const body = await resp.text().catch(() => "");
        throw new Error(`Erro na requisição: ${resp.status} ${body}`);
    }

    const data = await resp.json();
    return data;
}

// Filtra tarefas pendentes (sem resposta) e ordena por data de publicação (mais recente primeiro)
function filtrarOrdenarPendentes(tarefas) {
    return tarefas
        .filter(t => !t.task_expired && (t.answer_status == null || t.answer_status === 'pending'))
        .sort((a, b) => new Date(b.publish_at || 0) - new Date(a.publish_at || 0));
}

// Formata data para pt-BR (America/Sao_Paulo)
function formatarDataISO(iso) {
    if (!iso) return null;
    try {
        return new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    } catch {
        return iso;
    }
}

// Reduz para um resumo enxuto
function resumirTarefas(tarefas) {
    return tarefas.map(t => ({
        id: t.id,
        titulo: String(t.title || '').trim(),
        pontos: t.score ?? null,
        publicada_em: formatarDataISO(t.publish_at),
        autor: t.author || null,
        questoes: t.question_count ?? null,
        publication_target: t.publication_target || null
    }));
}

// SCRIPT TODO
async function main() {
    for (const item of lista) {
        console.log(`\nIniciando script para: Usuário: ${item.user} | Senha: ${item.pass}`);

        try {
            const loginResponse = await login(item.user, item.pass);
            console.log("Token recebido:", loginResponse.token || loginResponse.auth_token);

            const registro = await registrarToken(loginResponse);
            const primeiroNome = registro.name
                .split(" ")[0]               // Pega só até o primeiro espaço
                .toLowerCase()               // Coloca tudo minúsculo
                .replace(/^\w/, c => c.toUpperCase()); // Primeira letra maiúscula

            console.log("Registro realizado:", primeiroNome);

            if (item.servicos?.tarefasp) {
                const tarefas = await buscarTarefasPendentes(registro);
                const pendentes = filtrarOrdenarPendentes(tarefas);
                const resumo = resumirTarefas(pendentes);

                console.log(`Total pendentes: ${pendentes.length}`);
                console.table(resumo);
            }


        } catch (err) {
            console.error("Erro:", err.message);
        }
    }
}

main();
