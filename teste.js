const urlDeafult = 'https://edusp-api.ip.tv';

async function LoginCompletoToken(user, pass) {
    const url =
        "https://sedintegracoes.educacao.sp.gov.br/credenciais/api/LoginCompletoToken";
    const payload = {
        user: user,
        senha: pass,
    };

    const resp = await fetch(url, {
        method: "POST",
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            "ocp-apim-subscription-key": "2b03c1db3884488795f79c37c069381a",
            "sec-ch-ua":
                '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            Referer: "https://saladofuturo.educacao.sp.gov.br/",
        },
        body: JSON.stringify(payload),
    });

    if (!resp.ok) {
        console.log(`Deu erro na api: ${resp.status}`);
    }

    const data = await resp.json();
    // console.log('Resposta da requisição:', data);
    return data;
}

async function ListarTurmasPorAluno(codigoAluno) {
    const url =
        "https://sedintegracoes.educacao.sp.gov.br/apihubintegracoes/api/v2/Turma/ListarTurmasPorAluno" +
        `?codigoAluno=${codigoAluno}`;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "ocp-apim-subscription-key": "5936fddda3484fe1aa4436df1bd76dab",
            // "request-id": "|2185e3c832e34d56bbfc03797c0fdf4e.1533ca7c1d7f4943",
            "sec-ch-ua":
                '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            // "traceparent": "00-2185e3c832e34d56bbfc03797c0fdf4e-1533ca7c1d7f4943-01",
            Referer: "https://saladofuturo.educacao.sp.gov.br/",
            "Request-Context": "appId=cid-v1:861a4529-2cf3-4d08-a982-60d8c305b12e",
            "Set-Cookie":
                "ApplicationGatewayAffinityCORS=b6acccc21a1d7b0653c15fbda6021ce8; Path=/; SameSite=None; Secure",
        },
    });
    const data = await resp.json();
    // console.log(data);
    return data;
}

async function ListarBimestres(escolaId) {
    const url =
        "https://sedintegracoes.educacao.sp.gov.br/apihubintegracoes/api/v2/Bimestre/ListarBimestres" +
        `?escolaId=${escolaId}`;

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "ocp-apim-subscription-key": "5936fddda3484fe1aa4436df1bd76dab",
            // "request-id": "|8325139438984854bce460daba709068.d6eb0e879dc8481b",
            "sec-ch-ua":
                '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            // "traceparent": "00-8325139438984854bce460daba709068-d6eb0e879dc8481b-01",
            Referer: "https://saladofuturo.educacao.sp.gov.br/",
        },
    });

    const data = await resp.json();

    // console.log(atual);
    return data; // retorna só o bimestre atual (ou undefined se não achar)
}

function definirBimestreAtual(result) {
    // Pega "hoje" em São Paulo no formato YYYY-MM-DD
    const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date());

    // Filtra qual bimestre contém a data de hoje
    const atual = result.data.find(
        (b) => b.DataInicio.slice(0, 10) <= today && today <= b.DataFim.slice(0, 10)
    );

    return atual;
}

async function token(token) {
    const url = "https://edusp-api.ip.tv/registration/edusp/token";
    const payload = {
        token: token
    }

    const response = await fetch(url, {
        method: "POST",
        headers: {
            accept: "application/json",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            "priority": "u=1, i",
            // "request-id": "|8325139438984854bce460daba709068.bb6394204c924c72",
            "sec-ch-ua":
                '"Not;A=Brand";v="99", "Google Chrome";v="139", "Chromium";v="139"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            // traceparent: "00-8325139438984854bce460daba709068-bb6394204c924c72-01",
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            Referer: "https://saladofuturo.educacao.sp.gov.br/",
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    // console.log(data);
    return data;
}

async function ListarDisciplinaPorAluno(codigoAluno) {
    // fetch("https://sedintegracoes.educacao.sp.gov.br/apihubintegracoes/api/v2/Disciplina/ListarDisciplinaPorAluno?codigoAluno=26567520", {
    //     "headers": {
    //         "accept": "application/json, text/plain, */*",
    //         "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
    //         "ocp-apim-subscription-key": "5936fddda3484fe1aa4436df1bd76dab",
    //         "request-id": "|c72235153cdf473490d0c81d561a930b.01c9116751ac4df9",
    //         "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    //         "sec-ch-ua-mobile": "?0",
    //         "sec-ch-ua-platform": "\"Windows\"",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-site",
    //         "traceparent": "00-c72235153cdf473490d0c81d561a930b-01c9116751ac4df9-01",
    //         "Referer": "https://saladofuturo.educacao.sp.gov.br/"
    //     },
    //     "body": null,
    //     "method": "GET"
    // });

    const url = 'https://sedintegracoes.educacao.sp.gov.br/apihubintegracoes/api/v2/Disciplina/ListarDisciplinaPorAluno' + `?codigoAluno=${codigoAluno}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "ocp-apim-subscription-key": "5936fddda3484fe1aa4436df1bd76dab",
            // "request-id": "|c72235153cdf473490d0c81d561a930b.01c9116751ac4df9",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            // "traceparent": "00-c72235153cdf473490d0c81d561a930b-01c9116751ac4df9-01",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        }
    });

    const data = await response.json();
    // console.log(data);
    return data;
}

async function getUser(authToken) {
    const url = urlDeafult + '/room/user?list_all=true&with_cards=true';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            // "if-none-match": "W/\"48db-UnS1/TvWCUROXzz0frQ+G9nB7Lc\"",
            "priority": "u=1, i",
            // "request-id": "|7d824846f81f4de49bb80f334708a2fa.0f90b482c22a476e",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            // "traceparent": "00-7d824846f81f4de49bb80f334708a2fa-0f90b482c22a476e-01",
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/",
            'x-api-key': authToken
        }
    });

    const data = await response.json();
    // console.log(data);
    return data;
}

// Para fazer o categories precisa da requisição 'user'
async function getCategories(dataUser, nomeUser, authToken) {
    let path = '?expired_only=false&filter_expired=false&';

    const midPath = montarPathCategories(dataUser, nomeUser);

    path += midPath + 'category_parent_id=19&is_essay=false&is_exam=false';
    console.log('Path montado >', path);

    const endpoint = '/tms/task/targets/categories';
    const url = urlDeafult + endpoint + path;

    console.log('Url completa montada >', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            // "if-none-match": "W/\"2e3-qmpnmgIM/yicwh3illEwHRDcyjw\"",
            "priority": "u=1, i",
            // "request-id": "|0faf277710d4433fb22aa8cd3338d7cf.19ab692420fa47df",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            // "traceparent": "00-0faf277710d4433fb22aa8cd3338d7cf-19ab692420fa47df-01",
            "x-api-key": authToken,
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        }
    });


    const data = await response.json();
    // console.log('Resposta >', data);
    return data;
}

function montarPathCategories(dataUser, nomeUser) {
    let cardName = [];
    let idCategories = [];

    for (const room of dataUser.rooms) {
        cardName.push(room.name);
        for (const categories of room.group_categories) {
            idCategories.push(categories.id);
        }
    }

    console.log('Nome dos Cards >', cardName);
    console.log('Ids Categorias >', idCategories);

    let path = '';


    for (const name of cardName) {
        path += `publication_target=${name}&`;
    }

    for (const name of cardName) {
        path += `publication_target=${name}:${nomeUser}&`;
    }

    for (const id of idCategories) {
        path += `publication_target=${id}&`;
    }

    console.log('Função forma PATH >', path);
    return path;
}

async function getTarefasAFazer(dataUser, nomeUser, authToken) {
    fetch("https://edusp-api.ip.tv/tms/task/todo?expired_only=false&limit=100&offset=0&filter_expired=true&is_exam=false&with_answer=true&is_essay=false&publication_target=r069cd8fd50ca7de66-l&publication_target=ra0433e4ccfe70e277-l&publication_target=r069cd8fd50ca7de66-l:rafaelabite121044797-sp&publication_target=ra0433e4ccfe70e277-l:rafaelabite121044797-sp&publication_target=1698&publication_target=1205&publication_target=1560&publication_target=1173&publication_target=764&answer_statuses=draft&answer_statuses=pending&with_apply_moment=true", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            "priority": "u=1, i",
            "request-id": "|a7b3d7648acd4f6c9b82bfa37b2ca360.b8384a44697444a2",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "traceparent": "00-a7b3d7648acd4f6c9b82bfa37b2ca360-b8384a44697444a2-01",
            "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQwMmZhYTZmMTFkMTYwZDFlNWRiYzBmIiwic3VwZXJ2aXNlZXMiOltdLCJleHRlcm5hbF9pZCI6IjI5NTc1Njk1NiIsInNrZXkiOiJhdXRoX3Rva2VuOmVkdXNwOnJhZmFlbGFiaXRlMTIxMDQ0Nzk3LXNwIiwibmljayI6InJhZmFlbGFiaXRlMTIxMDQ0Nzk3LXNwIiwicmVhbG0iOiJlZHVzcCIsInJvbGUiOiIwMDA2IiwiaWF0IjoxNzU1NDUzNjgwLCJhdWQiOiJ3ZWJjbGllbnQifQ.sfXIt6SxBuJXn1bUpXKeAoqCJQ0zID0hmWAbtaHD-7I",
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        },
        "body": null,
        "method": "GET"
    });

    // https://edusp-api.ip.tv = urlDefault
    // /tms/task/todo = endpoint
    // ?expired_only=false
    // &limit=100
    // &offset=0
    // &filter_expired=true
    // &is_exam=false
    // &with_answer=true
    // &is_essay=
    

    // &publication_target=r069cd8fd50ca7de66-l
    // &publication_target=ra0433e4ccfe70e277-l
    // &publication_target=r069cd8fd50ca7de66-l:rafaelabite121044797-
    // &publication_target=ra0433e4ccfe70e277-l:rafaelabite121044797-sp
    // &publication_target=1698
    // &publication_target=1205
    // &publication_target=1560
    // &publication_target=1173
    // &publication_target=764


    // &answer_statuses=draft
    // &answer_statuses=pending
    // &with_apply_moment=true

    let queryParameters = montarPathCategories(dataUser, nomeUser);

    queryParameters += 'answer_statuses=draft&answer_statuses=pending&with_apply_moment=true';

    const url = urlDeafult + '/tms/task/todo' + '?expired_only=false&limit=100&offset=0&filter_expired=true&is_exam=false&with_answer=true&is_essay=false&' + queryParameters;
    console.log('Url montada >', url);
}
async function start() {
    const user = "00"; // 
    const pass = "Bi@";  // 

    const req1 = await LoginCompletoToken(user, pass);
    const dadosUsuario = req1.DadosUsuario;
    const codigoAluno = dadosUsuario.CD_USUARIO.toString().slice(0, -1);

    console.log("LoginCompletoToken >", req1);
    console.log("Código Aluno >", dadosUsuario.CD_USUARIO);

    const req2 = await ListarTurmasPorAluno(codigoAluno);
    const codigoEscola = req2.data[0].CodigoEscola;

    console.log("ListarTurmasPorAluno >", req2);
    console.log("Código Escola >", codigoEscola);

    const bimestres = await ListarBimestres(codigoEscola);

    console.log("Bimestres >", bimestres);

    const bimestreAtual = definirBimestreAtual(bimestres);

    console.log("Bimestre Atual >", bimestreAtual);

    const tokenGeral = await token(req1.token);

    console.log('Token Geral >', tokenGeral);
    console.log('Token de autenticação >', tokenGeral.auth_token);

    const listarTurmasPorAluno = await ListarDisciplinaPorAluno(codigoAluno);

    console.log('Listar Turmas Por Aluno >', listarTurmasPorAluno);

    const dataUser = await getUser(tokenGeral.auth_token);

    console.log('Dados do usuário >', dataUser);

    const categories = await getCategories(dataUser, tokenGeral.nick, tokenGeral.auth_token);

    console.log('Listar categorias >', categories);

    getTarefasAFazer(dataUser, tokenGeral.nick, tokenGeral.auth_token);
}

start();

// LoginCompletoToken
// 2b03c1db3884488795f79c37c069381a
// 2b03c1db3884488795f79c37c069381a
// 2b03c1db3884488795f79c37c069381a

// ListarTurmasPorAluno
// 5936fddda3484fe1aa4436df1bd76dab
// 5936fddda3484fe1aa4436df1bd76dab

// ListarBimestres
// 5936fddda3484fe1aa4436df1bd76dab