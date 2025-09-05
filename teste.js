require('dotenv').config(); // Carrega variáveis .env
const axios = require('axios');
const urlDeafult = 'https://edusp-api.ip.tv';

const apiKeyGroq = process.env.GROQ_API_KEY; // Chave da API do Groq

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

    try {
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

    } catch (err) {
        console.log('Deu erro >', err);
        process.exit(1);
    }
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
    // console.log('Path montado >', path);

    const endpoint = '/tms/task/targets/categories';
    const url = urlDeafult + endpoint + path;

    // console.log('Url completa montada >', url);

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

    // console.log('Nome dos Cards >', cardName);
    // console.log('Ids Categorias >', idCategories);

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

    // console.log('Função forma PATH >', path);
    return path;
}

async function getTarefasAFazer(dataUser, nomeUser, authToken) {

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
    // console.log('Url montada >', url);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
            "content-type": "application/json",
            "priority": "u=1, i",
            // "request-id": "|a7b3d7648acd4f6c9b82bfa37b2ca360.b8384a44697444a2",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            // "traceparent": "00-a7b3d7648acd4f6c9b82bfa37b2ca360-b8384a44697444a2-01",
            "x-api-key": authToken,
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        }
    });

    const data = await response.json();
    // console.log('Tarefas (JSON) >', data);
    // console.log(`Usuário possui ${data.length} tarefas pendentes.`);

    data.forEach(tarefa => {
        // console.log('Título da tarefa:', tarefa.title);
    });

    for (const tarefa of data) {
        const feito = await fazerTarefa(tarefa, authToken);
        if (feito) {
            console.log('Feito!');
        } else {
            console.log('Não foi feito... Parece que ocorreu algum erro');
        }

        break;
    }
}

async function ValidarToken(authToken) {
    const resp = await fetch("https://sedintegracoes.educacao.sp.gov.br/credenciais/api/ValidarToken", {
        "headers": {
            "accept": "application/json, text/plain, */*",
            "authorization": authToken,
            "ocp-apim-subscription-key": "2b03c1db3884488795f79c37c069381a",
            // "request-id": "|69d5f585670d4b7993c16c4d9b2d5391.8e9362d864e84bb0",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            // "traceparent": "00-69d5f585670d4b7993c16c4d9b2d5391-8e9362d864e84bb0-01",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        },
        "method": "POST"
    });

    const data = await resp.json();
    // console.log('Log ValidarToken >', data);
}

async function fazerTarefa(tarefa, authToken) {
    const url = urlDeafult + '/tms/task/' + tarefa.id + `/apply?preview_mode=false&token_code=null&room_name=${tarefa.publication_target}`;
    const respostasTarefa = []; // Aqui vai ficar uma lista com o índice da questão e a(s) resposta(s) correta(s)
    const payloadEntregarTarefa = {
        status: "submitted",
        answers: {},
        accessed_on: "room",
        executed_on: "r3fecffb9f4c2f1cea-l",
        duration: 1504.18
    }; //Falta terminar de programar o payload e a adição das respostas dentro dele...

    console.log('Só para lembrar o que é tarefa');
    console.log(tarefa);

    // console.log('url utilizada >', url);
    // console.log('Exemplo de url >',)
    // console.log(`Somente a tarefa ${tarefa.title}`);
    // console.log(tarefa);

    // const auth = await fetch("https://sedintegracoes.educacao.sp.gov.br/credenciais/api/ValidarToken", {
    //     "headers": {
    //         "accept": "application/json, text/plain, */*",
    //         "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
    //         "authorization": authToken,
    //         "ocp-apim-subscription-key": "2b03c1db3884488795f79c37c069381a",
    //         // "request-id": "|84324510fbb34037831b47076a664cd2.0bc82d67690e4439",
    //         "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    //         "sec-ch-ua-mobile": "?0",
    //         "sec-ch-ua-platform": "\"Windows\"",
    //         "sec-fetch-dest": "empty",
    //         "sec-fetch-mode": "cors",
    //         "sec-fetch-site": "same-site",
    //         // "traceparent": "00-84324510fbb34037831b47076a664cd2-0bc82d67690e4439-01",
    //         "Referer": "https://saladofuturo.educacao.sp.gov.br/"
    //     },
    //     "method": "POST"
    // });

    // const authReq = await auth.json();

    // console.log('Resultado da autorização de Token >', authReq);
    await ValidarToken(authToken);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            "accept": "application/json",
            "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "content-type": "application/json",
            "priority": "u=1, i",
            // "request-id": "|0b2d262d2c3c45b5b953ef313d2437bb.e92c3dbd51cb41a9",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            // "traceparent": "00-0b2d262d2c3c45b5b953ef313d2437bb-e92c3dbd51cb41a9-01",
            "x-api-key": authToken,
            "x-api-platform": "webclient",
            "x-api-realm": "edusp",
            "Referer": "https://saladofuturo.educacao.sp.gov.br/"
        }
    });

    // Parei aqui, ele dá erro porque dentro do JSON tem um HTML (mal formatado)
    // Esse mesmo HTML é o conteúdo da tarefa
    // Apenas precisamos encontrar uma forma de interpretar corretamente o HTML e passar para a IA responder
    // E depois responder todas as questões da tarefa corretamente.

    const data = await response.json();
    // console.log('Conteúdo da tarefa >', data);

    for (const block of data.questions) {
        // console.log('id >', block.id);
        // console.log('tipo >', block.type);
        // console.log('Nº da questão >', block.order);
        // console.log('Valor >', block.score);
        // console.log('Conteúdo (in html) >', block.statement);
        // console.log('Options >', block.options);

        // Está comentado apenas para não fazer requisição desnecessária para o Groq
        // << DEBUG >> LEMBRE DE DESCOMENTAR DEPOIS

        if (block.type === "single") {
            const enunciado = block.statement;

            // console.log('Questões SINGLE (Resposta única) ->', block);
            // console.log('ID:', block.id);
            // console.log('Type:', block.type);
            // console.log('Questão:', block.order);

            // console.log('Enunciado:', enunciado);

            let opcoes = "";
            let keys = Object.keys(block.options);

            // console.log('Lenght Opções', keys.length);

            // for (const key of keys) {

            //     let resposta = block.options[key].statement;

            //     console.log('==================');
            //     console.log('Index:', key)
            //     console.log('ID Resposta ->', block.options[key].id);
            //     console.log('Resposta ->', resposta);
            // }
            // console.log('Opções:', block);

            // Aqui ele fará a requisição com o AXIOS para o Groq e então pegará a resposta correta

            // Montar o prompt com o enunciado e as opções
            const promptUser = `Enunciado: ${enunciado}\nOpções:\n${keys.map(key => `- ${block.options[key].statement}`).join('\n')}`;

            // Aqui é o prompt do sistema (Vai dar um contexto para IA saber como responder)
            const promptSystem = "Você receberá questões com enunciado e alternativas formatadas em HTML (ou em estrutura semelhante). Sua tarefa é ler, interpretar e identificar a alternativa correta com base no conteúdo apresentado. Regras para a resposta: Responda com apenas uma letra, correspondente à alternativa correta. Não adicione parênteses, espaços, pontuações ou qualquer outro caractere. A resposta deve seguir exatamente este formato: Exemplos de respostas corretas: A B C D E Exemplos de respostas incorretas: A) A ) A. AA A (com espaço depois)";

            const url = 'https://api.groq.com/openai/v1/chat/completions';
            const data = {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            };

            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKeyGroq}`,
                    'Content-Type': 'application/json'
                }
            };

            const responseGroq = await axios.post(url, data, config);
            // console.log('Resposta do Groq >', responseGroq.data);

            const respostaIA = responseGroq.data.choices[0].message.content.trim();
            console.log('Resposta da IA >', respostaIA);

            respostasTarefa.push({ index: block.order, resposta: respostaIA });

            console.log('Respostas da tarefa até agora >', respostasTarefa);
        } else if (block.type === "fill-words") {

            let fraseCompleta = "";
            let opcoes = [];

            // console.log(block);

            block.options.phrase.forEach(el => {
                if (el.type === "text") {
                    fraseCompleta += el.value;
                } else {
                    fraseCompleta += "<SUBSTITUA>";
                }
            });


            // console.log('Frase >', fraseCompleta);
            // console.log('Opções >');

            block.options.items.forEach(opcao => {
                // console.log('->', opcao);
                opcoes.push(opcao);
            });

            // console.log('Array completa das opções >', opcoes);
            opcoes = opcoes.map(op => `- ${op}`).join('\n');
            const promptUser = `Enunciado: ${fraseCompleta}\nOpções:\n${opcoes}`;

            // Agora está com o prompt correto
            const promptSystem = "Você receberá um texto contendo marcações como <SUBSTITUA> e uma lista de opções de palavras. Sua tarefa é substituir cada ocorrência de <SUBSTITUA> pela palavra mais adequada da lista fornecida, com base no contexto do texto. Importante: responda apenas com as palavras escolhidas, separadas por vírgula, na ordem exata em que substituiriam os <SUBSTITUA> no texto. Não adicione espaços, pontuações extras, explicações ou palavras que não estejam na lista. Atenção: a lista de opções pode conter palavras que não devem ser utilizadas. Exemplo de formato correto de resposta: palavra1,palavra2,palavra3. Formatos incorretos: palavra1, palavra2, palavra3 (com espaços), palavra1-palavra2-palavra3 (com hífens), palavra1,palavra2,palavra3, (vírgula no final)."

            const url = 'https://api.groq.com/openai/v1/chat/completions';
            const data = {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            };
            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKeyGroq}`,
                    'Content-Type': 'application/json'
                }
            };
            const responseGroq = await axios.post(url, data, config);
            // console.log('Resposta do Groq >', responseGroq.data);    

            const respostaIA = responseGroq.data.choices[0].message.content.trim();
            console.log('Resposta da IA >', respostaIA);
            respostasTarefa.push({ index: block.order, resposta: respostaIA });
            console.log('Respostas da tarefa até agora >', respostasTarefa);

        } else if (block.type === "multi") {
            const enunciado = block.statement;
            const listaOpcoes = Object.values(block.options).map(opcao => opcao.statement);

            // console.log('Tipo de questão múltipla encontrada.\nBlock:', block);
            // console.log('Nº Questão:', nQuestao);
            // console.log('Enunciado:', enunciado);
            // console.log('Opções:', listaOpcoes);

            const promptUser = `Enunciado: ${enunciado}\nOpções: ${listaOpcoes}`;
            const promptSystem = "Você receberá questões com enunciado e alternativas formatadas em HTML (ou em estrutura semelhante), podendo haver mais de uma alternativa correta. Sua tarefa é ler, interpretar e identificar todas as alternativas corretas com base no conteúdo apresentado. Regras para a resposta: Responda com apenas as letras das alternativas corretas, separadas por vírgula e sem nenhum espaço ou caractere adicional. A resposta deve seguir exatamente este formato: Exemplo de resposta correta: \"A,D,E\" ou \"B,C\" (Não utilize aspas). Exemplos de respostas incorretas: A, B, C (com espaços), A B C (sem vírgulas), A-B-C (com hífens), A,B,C, (com vírgula no final), A,,B (com vírgulas duplicadas)."

            // Envia para o Groq em busca da resposta
            const url = 'https://api.groq.com/openai/v1/chat/completions';
            const data = {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            };

            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKeyGroq}`,
                    'Content-Type': 'application/json'
                }
            };

            const responseGroq = await axios.post(url, data, config);

            // console.log('Resposta do Groq >', responseGroq.data);    

            const respostaIA = responseGroq.data.choices[0].message.content.trim();
            // console.log('Resposta da IA >', respostaIA);
            respostasTarefa.push({ index: block.order, resposta: respostaIA });
        } else if (block.type === 'text_ai') {


            // AINDA NÃO PROGRAMADO POIS NÃO TIVE MAIS EXEMPLOS PARA USAR COMO BASE
            // <<<<<<<< DEBUG >>>>> LEMBRE DE PROGRAMAR DEPOIS
            // console.log('Questão dissertativa detectada. Gerando resposta com IA...');
            // console.log(block);
            // Captura o enunciado da questão
            const enunciado = block.statement;

            const promptSystem = "Você receberá um enunciado de questão dissertativa. Sua tarefa é gerar uma resposta completa, coerente, EXTREMAMENTE RESUMIDA (Evite respostas com mais de 200 caracteres) e relevante com base no conteúdo apresentado. Regras para a resposta: A resposta deve ser clara, objetiva, resumida, com erros de ortografia para parecer um ser humano de 15 anos e mal estruturada, abordando todos os pontos importantes relacionados ao enunciado. Certifique-se de que a resposta esteja diretamente relacionada ao enunciado fornecido.";
            const promptUser = `Enunciado: ${enunciado}`;

            // Envia para a API do Groq
            const url = 'https://api.groq.com/openai/v1/chat/completions';
            const data = {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            };
            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKeyGroq}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await axios.post(url, data, config);
            const respostaIA = response.data.choices[0].message.content.trim();
            console.log('Resposta da IA >', respostaIA);
            respostasTarefa.push({ index: block.order, resposta: respostaIA });
            console.log('Respostas da tarefa até agora >', respostasTarefa);

            process.exit(0);
        } else if (block.type === 'true-false') {
            // console.log(block);

            const enunciado = block.statement; // Enunciado da questão
            const listaOpcoes = Object.values(block.options).map(opcao => opcao.statement); // Opções (Verdadeiro ou Falso)

            // console.log('Tipo de questão verdadeiro ou falso encontrada.\nBlock:', block);
            // console.log('Enunciado:', enunciado);
            // console.log('Opções:', listaOpcoes);

            // Pergunta para a IA quais são verdadeiro e quais são falso.

            const promptSystem = "Você receberá um enunciado seguido de várias assertivas (alternativas) identificadas por letras, e deve classificá-las como verdadeiras (V) ou falsas (F), com base no contexto apresentado. Responda apenas com a letra da assertiva seguida de V ou F, separadas por vírgulas, mantendo a ordem em que aparecem. Não escreva explicações, espaços, nem nenhum outro caractere além das letras das alternativas, vírgulas e as letras V ou F. Exemplo de formato correto: A,V,B,V,C,F,D,F. Formatos incorretos: A - V, B - F (com hífens), A:V,B:F (com dois-pontos), A,V,B,V,C,F,D,F, (vírgula no final), A V B F (com espaços)."
            const promptUser = `Enunciado: ${enunciado}\nLista de opções: ${listaOpcoes.join(", ")}`;

            // Envia para o Groq em busca da resposta
            const url = 'https://api.groq.com/openai/v1/chat/completions';
            const data = {
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: promptSystem },
                    { role: "user", content: promptUser }
                ]
            };
            const config = {
                headers: {
                    'Authorization': `Bearer ${apiKeyGroq}`,
                    'Content-Type': 'application/json'
                }
            };

            // A resposta esperada será algo como "A,V,B,F,C,F" (sem aspas)
            // Então vamos formatar isso para o formato que a API do Salão do Futuro espera
            // Que é um array de true ou false (boolean)
            // Exemplo: [true, false, false, true]

            const response = await axios.post(url, data, config);
            const respostaIA = response.data.choices[0].message.content.trim();

            respostaIA.split(',').map(item => item.trim()); // Remove espaços em branco

            const respostasFormatadas = [];
            const partes = respostaIA.split(',');
            for (let i = 0; i < partes.length; i += 2) {
                // const letra = partes[i]; // Letra da alternativa
                const valor = partes[i + 1]; // V ou F
                if (valor === 'V') {
                    respostasFormatadas.push(true);
                } else if (valor === 'F') {
                    respostasFormatadas.push(false);
                }
            }

            console.log('Respostas formatadas para a API >', respostasFormatadas);

            respostasTarefa.push({ index: block.order, resposta: respostasFormatadas });
            console.log('Resposta da IA >', respostaIA);
        } else if (block.type !== 'info') {
            console.log('Tipo de questão ainda não identificada.\nType:', block.type) // Aqui é para DEBUG para eu saber quais precisa fazer a mais
        }


    }

    // Exibe todas as respostas capturadas
    console.log('Respostas capturadas para a tarefa:', respostasTarefa);

    // Aqui será a requisição para enviar as respostas
    // Por enquanto só está retornando true para indicar que terminou

    // Agora ele faz a requisição enviando a tarefa

    const urlAnswer = `https://edusp-api.ip.tv/tms/task/${tarefa.id}/answer`;
    const dataAnswer = payloadEntregarTarefa;
    const configAnswer = {};

    return true;
}

async function start() {
    const user = "1090963014sp";
    const pass = "Kk153264897!";

    const req1 = await LoginCompletoToken(user, pass);
    const dadosUsuario = req1.DadosUsuario;
    const codigoAluno = dadosUsuario.CD_USUARIO.toString().slice(0, -1);

    // console.log("LoginCompletoToken >", req1);
    // console.log("Código Aluno >", dadosUsuario.CD_USUARIO);

    const req2 = await ListarTurmasPorAluno(codigoAluno);
    const codigoEscola = req2.data[0].CodigoEscola;

    // console.log("ListarTurmasPorAluno >", req2);
    // console.log("Código Escola >", codigoEscola);

    const bimestres = await ListarBimestres(codigoEscola);

    // console.log("Bimestres >", bimestres);

    const bimestreAtual = definirBimestreAtual(bimestres);

    // console.log("Bimestre Atual >", bimestreAtual);

    const tokenGeral = await token(req1.token);

    await ValidarToken(req1.token);
    // console.log('Token Geral >', tokenGeral);
    // console.log('Token de autenticação >', tokenGeral.auth_token);

    const listarTurmasPorAluno = await ListarDisciplinaPorAluno(codigoAluno);

    // console.log('Listar Turmas Por Aluno >', listarTurmasPorAluno);

    const dataUser = await getUser(tokenGeral.auth_token);

    // console.log('Dados do usuário >', dataUser);

    const categories = await getCategories(dataUser, tokenGeral.nick, tokenGeral.auth_token);

    // console.log('Listar categorias >', categories);

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