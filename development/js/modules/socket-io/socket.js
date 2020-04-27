import base from './_base'
import chat from './_chat'
import drinks from './_drinks'

export function sockets(io) {
    base(io)
    chat(io)
    drinks(io)
}