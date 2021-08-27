import { embaralhar } from "../functions/arrays"
import RespostaModel from "./respostas"

export default class QuestaoModel {

    #id: number
    #enunciado: string
    #respostas: RespostaModel[]
    #acertou: boolean
    // #respondida: boolean

    constructor(id: number, enunciado: string, respostas: RespostaModel[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = respostas
        this.#acertou = acertou
    }

    get id() {
        return this.#id
    }

    get enunciado() {
        return this.#enunciado
    }

    get respostas() {
        return this.#respostas
    }

    get acertou() {
        return this.#acertou
    }

    get respondida() {
        for (let resposta of this.#respostas) {
            if (resposta.revelada) return true
        }
        return false
    }

    responderCom(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.certa
            return respostaSelecionada ? resposta.revelar() : resposta
        })
        return new QuestaoModel(this.id, this.enunciado, respostas, acertou )
    }

    embaralharRespostas(): QuestaoModel {
        let respostasEmbaralhadas = embaralhar(this.#respostas)
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    paraObjeto() {
        return {
            id: this.id,
            enunciado: this.enunciado,
            respostas: this.#respostas.map(resposta => resposta.paraObjeto()),
            acertou: this.#acertou
        }
    }

}