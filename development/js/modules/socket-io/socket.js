import base from './_base'
import chat from './_chat'

export function sockets(io) {
    base(io)
    chat(io)
}