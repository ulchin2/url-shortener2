"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    // ... (código gerado permanece igual)
};

const shortUrl_1 = require("../model/shortUrl");
const { nanoid } = require("nanoid"); // Certifique-se de importar o nanoid!

// ======================== CREATE ========================
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        
        // Normaliza a URL antes de verificar existência
        const normalizedUrl = normalizeUrl(fullUrl); // Função de normalização
        
        // Verifica se a URL já existe
        let urlFound = yield shortUrl_1.urlModel.findOne({ fullUrl: normalizedUrl });
        if (urlFound) {
            // Se o link já foi encurtado, retorna a URL encurtada existente
            return res.status(200).send({
                message: "URL already shortened",
                shortUrl: urlFound.shortUrl
            });
        }

        // Se não existe, cria um novo link encurtado
        const newShortUrl = nanoid(10); // Gera o shortUrl
        const newUrl = yield shortUrl_1.urlModel.create({
            fullUrl: normalizedUrl,
            shortUrl: newShortUrl // A URL encurtada gerada
        });

        res.status(201).send({
            message: "URL shortened successfully",
            shortUrl: newUrl.shortUrl
        });

    } catch (error) {
        if (error.code === 11000) { // Duplicata de shortUrl
            yield handleDuplicateShortUrl(res, fullUrl); // Tenta recriar
        } else {
            res.status(500).send({ message: "Internal server error" });
        }
    }
});

// ======================== GET ALL ========================
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield shortUrl_1.urlModel.find();
        res.status(200).send(shortUrls); // Sempre retorna array, mesmo vazio
    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// ======================== REDIRECT ========================
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params; // Correção crucial aqui!
        
        const url = yield shortUrl_1.urlModel.findOne({ shortUrl });
        if (!url) {
            return res.status(404).send({ message: "URL not found" });
        }

        url.clicks++;
        yield url.save(); // Await importante aqui
        
        res.redirect(url.fullUrl);

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// ======================== DELETE ========================
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortUrl } = req.params; // Usando shortUrl agora
        
        const deletedUrl = yield shortUrl_1.urlModel.findOneAndDelete({ shortUrl });
        if (!deletedUrl) {
            return res.status(404).send({ message: "URL not found" });
        }
        
        res.status(200).send({ message: "URL deleted successfully" });

    } catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
});

// ======================== HELPER FUNCTIONS ========================
const normalizeUrl = (url) => {
    // Garante que o URL tenha protocolo
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
    }
    return url;
};

const handleDuplicateShortUrl = (res, fullUrl) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newShortUrl = nanoid(10); // Gera novo shortUrl
        const newUrl = yield shortUrl_1.urlModel.create({ 
            fullUrl,
            shortUrl: newShortUrl // Força nova geração
        });
        res.status(201).send(newUrl);
    } catch (error) {
        res.status(500).send({ message: "Failed to generate unique short URL" });
    }
});

exports.deleteUrl = deleteUrl;
exports.getUrl = getUrl;
exports.getAllUrl = getAllUrl;
exports.createUrl = createUrl;
