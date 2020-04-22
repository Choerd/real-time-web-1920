import base from './_base'
import chat from './_chat'

export function sockets(io) {
    base(io)
    chat(io)

    const listItems = document.querySelector('[grocery-container] ul').children
    console.log(listItems)

}