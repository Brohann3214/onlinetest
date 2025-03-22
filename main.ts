let req = ""
let myTextSprite: fancyText.TextSprite = null
let datareq = ""
let myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("view page"),
    //miniMenu.createMenuItem("create page")
)
let testmsg = "tick"
//let connection = false
let answer = ''
const ws = new WebSocket("wss://weboscketserver2.onrender.com")

control.runInParallel(function () {
    console.log(`connecting to wss://weboscketserver2.onrender.com`)


    ws.onerror = () => console.log("error connecting to server, it may be offline.")
    ws.onmessage = (msg) => {
        gottenanswer = true
        const data = msg.data;
        console.log(`[Recieved] ${data}`)
        answer = `${data}`
    }
    ws.onopen = () => {

        //ws.send(msg);
        console.log(`connected`);
        //connection = true

        game.onUpdateInterval(10000, function () {
            ws.send("tick")
        })

    }
    ws.onclose = () => {
        console.log("disconnected")
    }


})
game.consoleOverlay.setVisible(true)
//3
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
scene.setBackgroundColor(13)

let gottenanswer = false
myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    if (selectedIndex == 0) {
        datareq = "/pages/" + game.askForString("what is the title?", 24)
        gottenanswer = false
        ws.send(datareq)
        pauseUntil(() => gottenanswer)
        if (answer.includes("!s!")) {
            console.log(answer)
            answer = answer.substr(4, answer.length - 5)
            console.log("song playing")
            //console.log(answer)
            console.log(Buffer.fromUTF8(answer))
            music.play(music.createSong(Buffer.fromHex(answer)), music.PlaybackMode.UntilDone)
        } else {
            myTextSprite = fancyText.create(answer, 300, 15, fancyText.serif_small)
            fancyText.setFrame(myTextSprite, img`
            b b b b b b b b b b b b b b .
            b d d d d d d d d d d d d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d 1 1 1 1 1 1 1 1 1 1 d b c
            b d d d d d d d d d d d d b c
            b b b b b b b b b b b b b b c
            . c c c c c c c c c c c c c c
        `)
        }

        //let textSprite = textsprite.create(answer,1,15)
        //textSprite.setPosition(160, 100)
        //textSprite.setMaxFontHeight(8)
        //textSprite.setOutline(6,1)
        if (answer.includes("makecode.com")) {
            answer = answer.substr(1, answer.length - 2)
            web.open(answer)
            console.log("link opening")
            console.log(answer)
        }
        if (answer.includes("!s!")) {
            console.log(answer)
            answer = answer.substr(4, answer.length - 5)
            console.log("song playing")
            console.log(answer)
            console.log(Buffer.fromUTF8(answer))
            music.play(music.createSong(Buffer.fromHex(answer)), music.PlaybackMode.UntilDone)
        }
        //music.play(music.createSong(hex`0078000408020100001c00010a006400f4016400000400000000000000000000000000050000044e0000000400010504000800010608000c00010a0c001000010d10001400011114001800011418001c0001181c002000011920002400011d24002800012028002c0001242c003000012730003400012a`), music.PlaybackMode.UntilDone)

    }
    if (selectedIndex == 1) {
        gottenanswer = true
        req = "n/pages/" + game.askForString("what is the title?", 12) + ">" + game.askForString("sentence 1", 24) + game.askForString("sentence 2", 24) + game.askForString("sentence 3", 24)
        ws.send(req)
    }
    myMenu.close()
})

