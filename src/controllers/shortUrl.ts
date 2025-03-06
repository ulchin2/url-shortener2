import express from "express";
import { urlModel } from "../model/shortUrl";
import { nanoid } from "nanoid"; // Importando o nanoid para gerar short URLs


// Criar URL encurtada
export const createUrl = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { fullUrl } = req.body;

        if (!fullUrl) {
            res.status(400).json({ message: "Full URL is required" });
            return;
        }

        console.log("The fullUrl is", fullUrl);

        // Normaliza a URL antes de verificar existência
        const normalizedUrl = normalizeUrl(fullUrl);

        // Verifica se a URL já foi encurtada antes
        let urlFound = await urlModel.findOne({ fullUrl: normalizedUrl });

        if (urlFound) {
            res.status(200).json({ message: "URL already shortened", shortUrl: urlFound.shortUrl, clicks: urlFound.clicks });
            return;
        }

        // Gera um shortUrl único
        const newShortUrl = nanoid(10); // Gera um shortUrl de 10 caracteres

        // Cria nova URL encurtada se não existir
        const shortUrl = await urlModel.create({
            fullUrl: normalizedUrl,
            shortUrl: newShortUrl,
            clicks: 0 // Inicializa o contador de cliques
        });

        res.status(201).json({
            message: "URL shortened successfully",
            shortUrl: shortUrl.shortUrl,
            clicks: shortUrl.clicks // Retorna o número de cliques
        });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

// Obter todas as URLs encurtadas
export const getAllUrl = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const shortUrls = await urlModel.find();
        if (shortUrls.length === 0) {
            res.status(404).json({ message: "Short URLs not found!" });
            return;
        }
        res.status(200).json(shortUrls);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

// Obter uma URL específica (incrementando os cliques)
export const getUrl = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // Use "shortUrl" como parâmetro para buscar no banco de dados
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.shortUrl });

        if (!shortUrl) {
            res.status(404).json({ message: "Full URL not found!" });
            return;
        }

        shortUrl.clicks++; // Incrementa o número de cliques
        await shortUrl.save(); // Salva o novo número de cliques

        res.redirect(shortUrl.fullUrl);

        
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

// Deletar uma URL específica
export const deleteUrl = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete(req.params.id);

        if (shortUrl) {
            res.status(200).json({ message: "Requested URL successfully deleted!" });
        } else {
            res.status(404).json({ message: "URL not found!" });
        }
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};



 //melhorar a resposta para contagem de cliques
export const getUrlStats = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.shortUrl });

        if (!shortUrl) {
            res.status(404).json({ message: "URL not found!" });
            return;
        }

        res.status(200).json({ shortUrl: shortUrl.shortUrl, clicks: shortUrl.clicks });
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};

// ======================== HELPER FUNCTION ========================
const normalizeUrl = (url: string): string => {
    // Garante que o URL tenha protocolo
    if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`; // Normaliza para https caso não tenha protocolo
    }
    return url;
};
