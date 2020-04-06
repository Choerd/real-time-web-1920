const socket = io()

socket.on('connect', () => {
    console.log('Connection to server has been made!')
})