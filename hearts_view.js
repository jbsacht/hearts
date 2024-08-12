import {HeartsRobotJoe} from "./hearts_robot_joe.js";
import {Card, Hand, Trick} from "./hearts_model.js";
import {HU} from "./hearts_utils.js";

export class HeartsView {

    //sources
    //music link: https://www.youtube.com/watch?v=WwB8SQMyfls&t=329s
    //rj picture: https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4433176.png&w=350&h=254
    //caleb picture: https://goheels.com/sports/mens-basketball/roster/caleb-love/23545
    //hunter picture: https://a.espncdn.com/combiner/i?img=/i/headshots/mens-college-basketball/players/full/4432954.png
    //applause sound: https://www.youtube.com/watch?v=El3Qiq9hQYc
    //pick card sound: https://www.youtube.com/watch?v=sW8TKZtoND8
    //wrong card sound: https://www.youtube.com/watch?v=qeZpgFzmcDI

    #model
    #controller

    constructor(model, controller) {
        this.#model = model;
        this.#controller = controller;
        this.passed_cards = [];
        this.your_name;
    }
    display_name_menu(render_div) {
        let canvas = document.createElement('div');
        canvas.style.width = '1040px'
        canvas.style.height = '700px';
        canvas.style.position = "absolute";
        canvas.style.top = "0px"
        canvas.style.left = "0px"
        canvas.style.background = '#c2f3ff';
        render_div.append(canvas);

        let welcome = document.createElement('div')
        welcome.style.fontSize = "80px"
        welcome.style.position = "absolute"
        welcome.style.left = "20px"
        welcome.style.top = "100px"
        welcome.append("Welcome to Hearts!")
        welcome.append(document.createElement("br"))
        welcome.append("Choose a name: ")

        render_div.append(welcome);

        let cli = document.createElement('input');
        cli.style.width = '800px';
        cli.style.height = "200px"
        cli.style.fontSize = "100px"
        cli.style.position = "absolute"
        cli.style.top = "400px"
        cli.style.left = "30px"

        cli.setAttribute('type', 'text');

        //render_div.append(out_ta);
        render_div.append(document.createElement('br'));
        //render_div.append(cli);

        cli.addEventListener('change', () => {
            let audio = new Audio('billiards.mp3');
            audio.play();
            this.your_name = cli.value;
            this.#controller.startGame('Caleb', 'Hunter', this.your_name, 'RJ');
        });
        render_div.append(cli);
    }
    display_winner(render_div, winner){
        let audio = new Audio('claps.mp3');
        audio.play();

        let canvas = document.createElement('div');
        canvas.style.width = '1040px'
        canvas.style.height = '700px';
        canvas.style.position = "absolute";
        canvas.style.top = "0px"
        canvas.style.left = "0px"
        canvas.style.background = '#c2f3ff';
        render_div.append(canvas);

        let winnerPic = document.createElement("div");
        winnerPic.style.position = "absolute";
        winnerPic.style.left = "50px"
        winnerPic.style.top = "50px"
        winnerPic.style.fontSize = "120px"
        winnerPic.append(winner + " wins!! ");
        if(winner == "RJ") {
            let img = document.createElement("img")
            img.src = "imgs/rj.png"
            img.style.width = "300px"
            img.style.height = "350px"
            winnerPic.append(img);
        }
        else if(winner == "Caleb") {
            let img = document.createElement("img")
            img.src = "imgs/caleb.png"
            img.style.width = "300px"
            img.style.height = "350px"
            winnerPic.append(img);
        }
        else if(winner == "Hunter") {
            let img = document.createElement("img")
            img.src = "imgs/3ptking.png"
            img.style.width = "300px"
            img.style.height = "350px"
            winnerPic.append(img);
        }
        else {
            winnerPic.append("\u{1415}")
        }
        render_div.append(winnerPic)
        this.display_scores(render_div)
    }
    display_card_played(render_div, cards_played) {
        let backgroundColor = "skyblue";
        for(let i=0; i<cards_played.length; i++){
            let card_played = cards_played[i].card;
            let position = cards_played[i].position;
            let card = document.createElement('div');
            card.style.position = 'absolute'
            card.style.background = backgroundColor;
            card.style.border = 'black';
            card.style.borderWidth = "2px";
            card.style.borderStyle = "solid"
            card.style.width = '50px';
            card.style.height = '100px';
            if(position == "north") {
                card.style.left = "500px";
                card.style.top = "300px";   
            }
            if(position == "east") {
                card.style.left = "550px";
                card.style.top = "350px";
            }
            if(position == "south") {
                card.style.left = "500px";
                card.style.top = "450px";
            }
            if(position == "west") {
                card.style.left = "450px";
                card.style.top = "350px";
            }
            card.style.textAlign = "left";
            card.style.verticalAlign = "0px";
            let suit = card_played.getSuit();
            let rank = card_played.getRank();
            if(rank == 11) {
                rank = "J";
            }
            else if(rank == 12) {
                rank = "Q";
            }
            else if(rank == 13) {
                rank = "K";
            }
            else if(rank == 14) {
                rank = "A";
            }

            if(suit == "hearts") {
                suit = "\u{2665}";
                card.style.color = "red"
            }
            else if(suit == "spades") {
                suit = "\u{2660}";
            }
            else if(suit == "clubs") {
                suit = "\u{2663}";
            }
            else if(suit == "diamonds") {
                suit = "\u{2666}";
                card.style.color = "red"
            }

            card.append(suit);
            card.append(document.createElement('br'));
            card.append(rank);

            render_div.append(card);
        }
    }
    display_other_hands (render_div) {
        let backgroundColor = "skyblue";
        let northHand = this.#model.getHand('north').getCards();
        for(let i=0; i<northHand.length; i++) {
            let card = document.createElement('div');
            card.style.position = 'absolute'
            card.style.background = backgroundColor;
            card.style.border = 'black';
            card.style.borderWidth = "2px";
            card.style.borderStyle = "solid"
            card.style.width = '50px';
            card.style.height = '100px';
            card.style.left = 320 + 25 * i + "px";
            card.style.top = "100px";
            card.style.textAlign = "left";
            card.style.verticalAlign = "0px";

            render_div.append(card);
        }
        
        let caleb = document.createElement("img");
        caleb.src = "imgs/caleb.png"
        caleb.style.position = "absolute"
        caleb.style.left = "110px"
        caleb.style.top = "0px";
        caleb.style.width = "110px"
        caleb.style.height = "100px"
        caleb.style.paddingLeft = "350px"
        caleb.style.paddingRight = "335px"
        caleb.style.background = backgroundColor;
        caleb.addEventListener("click", function () {
            alert("Caleb: \"I LOVE Hearts\"");
        });
        caleb.style.cursor = "pointer";
        render_div.append(caleb);

        let rj = document.createElement("img");
        rj.src = "imgs/rj.png"
        rj.style.position = "absolute"
        rj.style.left = "0px"
        rj.style.top = "100px";
        rj.style.width = "110px"
        rj.style.height = "100px"
        rj.style.background = backgroundColor;
        rj.style.paddingTop = "240px"
        rj.style.paddingBottom = "260px"
        rj.addEventListener("click", function () {
            alert("RJ: \"Caleb is trash\"");
        });
        rj.style.cursor = "pointer";
        render_div.append(rj);

        let hunt = document.createElement("img");
        hunt.src = "imgs/3ptking.png"
        hunt.style.position = "absolute"
        hunt.style.left = "905px"
        hunt.style.top = "100px";
        hunt.style.width = "135px"
        hunt.style.height = "100px"
        hunt.style.paddingTop = "240px"
        hunt.style.paddingBottom = "260px"
        hunt.style.background = backgroundColor;
        hunt.addEventListener("click", function () {
            alert("Hunter: \"I'm gonna shoot the moon, just like when I dropped 31 on Duke in the ACC Championship\"");
        });
        hunt.style.cursor = "pointer";
        render_div.append(hunt);

        let heart = document.createElement("div")
        heart.style.position = "absolute"
        heart.style.left = "10px"
        heart.style.top = "0px"
        heart.style.width = "130px"
        heart.style.height = "130px"
        heart.style.fontSize = "60px"
        heart.style.paddingLeft = "25px"
        heart.style.paddingTop = "15px"
        heart.style.color = "black"
        heart.append("\u{2665}")
        render_div.append(heart);

        let heart1 = document.createElement("div")
        heart1.style.position = "absolute"
        heart1.style.left = "920px"
        heart1.style.top = "0px"
        heart1.style.width = "130px"
        heart1.style.height = "130px"
        heart1.style.fontSize = "60px"
        heart1.style.paddingLeft = "25px"
        heart1.style.paddingTop = "15px"
        heart1.style.color = "black"
        heart1.append("\u{2665}")
        render_div.append(heart1);

        let westHand = this.#model.getHand('west').getCards();
        for(let i=0; i<westHand.length; i++) {
            let card = document.createElement('div');
            card.style.position = 'absolute'
            card.style.background = backgroundColor;
            card.style.border = 'black';
            card.style.borderWidth = "2px";
            card.style.borderStyle = "solid"
            card.style.width = '100px';
            card.style.height = '50px';
            card.style.left = "105px"
            card.style.top = 220 + 25 * i + "px"
            card.style.textAlign = "left";
            card.style.verticalAlign = "0px";

            render_div.append(card);
        }

        let eastHand = this.#model.getHand('east').getCards();
        for(let i=0; i<eastHand.length; i++) {
            let card = document.createElement('div');
            card.style.position = 'absolute'
            card.style.background = backgroundColor;
            card.style.border = 'black';
            card.style.borderWidth = "2px";
            card.style.borderStyle = "solid"
            card.style.width = '100px';
            card.style.height = '50px';
            card.style.left = "805px"
            card.style.top = 220 + 25 * i + "px"
            card.style.textAlign = "left";
            card.style.verticalAlign = "0px";

            render_div.append(card);
        }
    }

    display_hand(render_div) {
        let canvas = document.createElement('div');
        canvas.style.width = '800px'
        canvas.style.height = '600px';
        canvas.style.position = "absolute";
        canvas.style.top = "100px"
        canvas.style.left = "105px"
        canvas.style.background = '#c2f3ff';
        render_div.append(canvas);

        let backgroundColor = "skyblue";
        let myHand = this.#model.getHand('south').getCards();
        let hearts = myHand.filter(c=> c.getSuit() == 'hearts').sort((a,b) => a.getRank() - b.getRank())
        let clubs = myHand.filter(c=> c.getSuit() == 'clubs').sort((a,b) => a.getRank() - b.getRank())
        let diamonds = myHand.filter(c=> c.getSuit() == 'diamonds').sort((a,b) => a.getRank() - b.getRank())
        let spades = myHand.filter(c=> c.getSuit() == 'spades').sort((a,b) => a.getRank() - b.getRank())
        myHand = [...hearts, ...spades, ...diamonds, ...clubs];

        for(let i=0; i<myHand.length; i++) {
            let card = document.createElement('button');
            card.style.position = 'absolute'
            let passed = false;
            for(let j=0; j<this.passed_cards.length; j++) {
                if(this.passed_cards[j].getRank() == myHand[i].getRank() &&
                this.passed_cards[j].getSuit() == myHand[i].getSuit()) {
                    passed = true;
                }
            }
            if(this.#model.getState() == "passing" && passed) {
                card.style.background = "skyblue"
            }
            else {
                card.style.background = backgroundColor;
            }
            card.style.border = 'black';
            card.style.borderWidth = "2px";
            card.style.borderStyle = "solid";
            card.style.width = '50px';
            card.style.height = '100px';
            card.style.left = 320 + 25 * i + "px";
            card.style.top = "600px";
            card.style.textAlign = "left";
            card.style.cursor = "pointer";
            card.style.verticalAlign = "0px";
            card.onmouseover = () => {
                if(this.#model.getState() == "passing" || this.#controller.isPlayable("south", myHand[i])) {
                    card.style.backgroundColor = "lightblue";
                }
            }
            card.onmouseleave = () => {
                if(this.#model.getState() == "passing" && passed) {
                    card.style.background = "lightblue"
                }
                else {
                    card.style.backgroundColor = backgroundColor
                }
            }



            let suit = myHand[i].getSuit();
            let rank = myHand[i].getRank();
            if(rank == 11) {
                rank = "J";
            }
            else if(rank == 12) {
                rank = "Q";
            }
            else if(rank == 13) {
                rank = "K";
            }
            else if(rank == 14) {
                rank = "A";
            }

            if(suit == "hearts") {
                suit = "\u{2665}";
                card.style.color = "red"
            }
            else if(suit == "spades") {
                suit = "\u{2660}";
            }
            else if(suit == "clubs") {
                suit = "\u{2663}";
            }
            else if(suit == "diamonds") {
                suit = "\u{2666}";
                card.style.color = "red"
            }
            //let button = document.createElement("button");
            card.append(suit);
            card.append(document.createElement('br'));
            card.append(rank);

            card.addEventListener("click", () => {
                if(this.#model.getState() == "passing") {
                    let alreadyPassed = false;
                    for(let j=0; j<this.passed_cards.length; j++) {
                        if(this.passed_cards[j].getRank() == myHand[i].getRank() &&
                        this.passed_cards[j].getSuit() == myHand[i].getSuit()) {
                            this.passed_cards.splice(j, 1);
                            alreadyPassed = true;
                            passed = false;
                        }
                    }
                    if(!alreadyPassed) {
                        this.passed_cards.push(myHand[i]);
                        if(this.passed_cards.length >= 3) {
                            this.#controller.passCards('south', this.passed_cards);
                            this.passed_cards = [];
                        }
                        else {
                            passed = true;
                        }
                    }
                }
                else {
                    if(this.#controller.isPlayable("south", myHand[i])) {
                        let audio = new Audio('select.mp3');
                        audio.play();
                        this.#controller.playCard("south", myHand[i]);
                    }
                    else {
                        let audio = new Audio('wrong.mp3');
                        audio.play();
                    }
                }
            });
            render_div.append(card);
        }
    }

    display_scores(render_div) {

        let scoreboard = document.createElement("div");
        scoreboard.style.position = "absolute"
        scoreboard.style.left = "800px"
        scoreboard.style.top = "600px"


        scoreboard.append("RJ: " + this.#model.getScore("west"));
        scoreboard.append(document.createElement("br"))
        scoreboard.append("Caleb: " + this.#model.getScore("north"));
        scoreboard.append(document.createElement("br"))
        scoreboard.append("Hunter: " + this.#model.getScore("east"));
        scoreboard.append(document.createElement("br"))
        scoreboard.append(this.your_name + ": " + this.#model.getScore("south"));
        render_div.append(scoreboard);
    }

    render(render_div) {
        this.display_name_menu(render_div);
        let cards_played = [];

        let out_ta = document.createElement('textarea');
        out_ta.style.width = '800px';
        out_ta.style.height = '200px';
        out_ta.style.position = "absolute";
        out_ta.style.top = "700px"
        out_ta.style.left = "30px"
        out_ta.readOnly = true;

        let cli = document.createElement('input');
        cli.style.width = '800px';
        cli.style.position = "absolute"
        cli.style.top = "920px"
        cli.style.left = "30px"

        cli.setAttribute('type', 'text');

        //render_div.append(out_ta);
        render_div.append(document.createElement('br'));
        //render_div.append(cli);

        cli.addEventListener('change', () => {
            this.display_hand(render_div);
            this.display_other_hands(render_div);
            this.display_card_played(render_div, cards_played);
            this.display_scores(render_div)
            let [component, method, ...args] = cli.value.split(" ");

            out_ta.append(`> ${cli.value}\n`);

            let res = null;
            if (component == 'model') {
                let res = this.#model[method](...args);
                if ((res instanceof Hand) || (res instanceof Trick)) {
                    out_ta.append(`${res.toString()}\n`);
                } else {
                    out_ta.append(`${JSON.stringify(res)}\n`);
                }
            } else if (component == 'controller') {
                switch (method) {
                    case 'passCards':
                        res = this.#controller.passCards('south',
                                                             [this.#parseCard(args[0]),
                                                              this.#parseCard(args[1]),
                                                              this.#parseCard(args[2])]);
                        break;
                    case 'isPlayable':
                        res = this.#controller.isPlayable('south', this.#parseCard(args[0]));
                        break;
                    case 'playCard':
                        res = this.#controller.playCard('south', this.#parseCard(args[0]));
                        break;
                }
                out_ta.append(`${res}\n`);
            }
            cli.value = "";
        });

        this.#model.addEventListener('stateupdate', () => {
            this.display_hand(render_div);
            this.display_other_hands(render_div);
            this.display_card_played(render_div, cards_played);
            this.display_scores(render_div)

            if (this.#model.getState() == 'passing') {
                out_ta.append("Passing: " + this.#model.getPassing() + "\n");
                if (this.#model.getPassing() != 'none') {
                    out_ta.append("Use 'controller passCards <card1> <card2> <card3>' to pass\n");
                    out_ta.append("Your hand:\n");
                    out_ta.append(this.#model.getHand('south').toString());
                }
            } else if (this.#model.getState() == 'playing') {
                out_ta.append("Passes complete, game starting.\n");
            } else if (this.#model.getState() == 'complete') {
                let winner = null;
                let winning_score = 200;
                HU.positions.forEach(p => {
                    if (this.#model.getScore(p) < winning_score) {
                        winning_score = this.#model.getScore(p);
                        winner = p;
                    }
                });
                this.display_winner(render_div, this.#model.getPlayerName(winner));
                out_ta.append(`Match over, ${this.#model.getPlayerName(winner)} wins!\n`);
            }
        })

        this.#model.addEventListener('trickstart', () => {
            this.display_hand(render_div);
            this.display_other_hands(render_div);
            this.display_scores(render_div)
            cards_played = [];
            out_ta.append("Trick started\n");
            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                out_ta.append("Your turn to play. Use 'controller playCard <card>'.\n");
                out_ta.append("Your hand:\n" + this.#model.getHand('south').toString());
            }
        });

        this.#model.addEventListener('trickplay', (e) => {
            this.display_hand(render_div);
            this.display_other_hands(render_div);
            cards_played.push({card: e.detail.card, position: e.detail.position})
            this.display_card_played(render_div, cards_played);
            this.display_scores(render_div)
            out_ta.append(this.#model.getPlayerName(e.detail.position) + " played the " + e.detail.card.toString() + "\n");
            if (this.#model.getCurrentTrick().nextToPlay() == 'south') {
                out_ta.append("Your turn to play. Use 'controller playCard <card>'.\n");
                out_ta.append("Your hand:\n" + this.#model.getHand('south').toString());
            }
        });

        this.#model.addEventListener('trickcollected', (e) => {
            this.display_hand(render_div);
            this.display_other_hands(render_div);
            this.display_scores(render_div)
            out_ta.append("Trick won by " + this.#model.getPlayerName(e.detail.position) + "\n");
            cards_played = []
        });

        this.#model.addEventListener('scoreupdate', (e) => {
            if (e.detail.moonshooter != null) {
                //this.shot_moon = true;
                //alert(this.#model.getPlayerName(e.detail.moonshooter) + " shot the moon!");
            }
            out_ta.append(`Score update: 
  ${this.#model.getPlayerName('north')}: ${e.detail.entry.north}
  ${this.#model.getPlayerName('east')} : ${e.detail.entry.east}
  ${this.#model.getPlayerName('south')}: ${e.detail.entry.south}
  ${this.#model.getPlayerName('west')} : ${e.detail.entry.west}\n`);
            out_ta.append(`Current totals: 
  ${this.#model.getPlayerName('north')}: ${this.#model.getScore('north')}
  ${this.#model.getPlayerName('east')} : ${this.#model.getScore('east')}
  ${this.#model.getPlayerName('south')}: ${this.#model.getScore('south')}
  ${this.#model.getPlayerName('west')} : ${this.#model.getScore('west')}\n`);
        });

        // Uncomment the following line if you want to see four robots
        // play each other instead of entering commands
        //let south_robot = new HeartsRobotKmp(this.#model, this.#controller, 'south');

        let west_robot = new HeartsRobotJoe(this.#model, this.#controller, 'west');
        let north_robot = new HeartsRobotJoe(this.#model, this.#controller, 'north');
        let east_robot = new HeartsRobotJoe(this.#model, this.#controller, 'east');

        //this.#controller.startGame('Caleb', 'Hunter', 'You', 'RJ');
    }

    #parseCard(cstr) {
        let rank_char = cstr[0];
        let suit_char = cstr[1];

        let rank;
        if (rank_char == 'T' || rank_char == 't') {
            rank = 10;
        } else if (rank_char == 'J' || rank_char == 'j') {
            rank = 11;
        } else if (rank_char == 'Q' || rank_char == 'q') {
            rank = 12;
        } else if (rank_char == 'K' || rank_char == 'k') {
            rank = 13;
        } else if (rank_char == 'A' || rank_char == 'a') {
            rank = 14;
        } else {
            rank = parseInt(rank_char);
        }
        let suit;
        if (suit_char == 'H' || suit_char == 'h') {
            suit = 'hearts';
        } else if (suit_char == 'S' || suit_char == 's') {
            suit = 'spades';
        }
        if (suit_char == 'C' || suit_char == 'c') {
            suit = 'clubs';
        }
        if (suit_char == 'D' || suit_char == 'd') {
            suit = 'diamonds';
        }

        return new Card(suit, rank);
    }
}