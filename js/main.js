"use strict";

{
    class Panel{
        constructor(){
            //sectionだけconstをつけたのは、sectionはこのコンストラクタでしか使わないから
            const section = document.createElement("section");
            section.classList.add("panel");
            //thisをつけるのはPanelクラスの別のメソッドからも呼び出したいから
            this.img = document.createElement("img");
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;
            this.stop = document.createElement("div");
            this.stop.textContent = "STOP";
            this.stop.classList.add("stop", "inactive");
            //stopボタンの処理
            this.stop.addEventListener("click", ()=>{
                let ms = new Audio("audio/oi.mp3");
                ms.play();
                if(this.stop.classList.contains("inactive")){return;}
                this.stop.classList.add("inactive");
                clearTimeout(this.timeoutId);

                panelsLeft--;
                // 動いているパネルの数が０になったら
                if(panelsLeft === 0){
                    spin.classList.remove("inactive");
                    panelsLeft = 3;
                    checkResult();
                }
            });

            section.appendChild(this.img);
            section.appendChild(this.stop);

            this.main = document.querySelector("main");
            this.main.appendChild(section);
        }

        getRandomImage(){
            const images = [
                "img/Alma.jpg",
                "img/おはよう.JPG",
                "img/出陣じゃー.JPG",
            ];
            return images[Math.floor(Math.random()*images.length)];
        }

        spin(){
            //getRandomImage:イメージをランダムに取得
            this.img.src = this.getRandomImage();
            this.timeoutId = setTimeout(()=>{
                this.spin();
            },50);
        }

        isUnmatched(p1,p2){
            // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src){
            //     return true;
            // } else {
            //     return false;
            // }
            //↑と同じ
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }

        matched(p1,p2){
            return this.img.src === p1.img.src && this.img.src === p2.img.src;
        }

        //マッチしていなかったら色を薄くする
        unmatch(){
            this.img.classList.add("unmatched");
        }

        //マッチしていたらの処理
        match(){
            this.main.classList.add("matched");
            alert("おめでとうございます！")
        }

        activate(){
            this.img.classList.remove("unmatched");
            this.stop.classList.remove("inactive");
        }
    }

    function checkResult(){
        //パネルが他のパネルとマッチしたかどうかのメソッド:isUnmatched
        if(panels[0].isUnmatched(panels[1],panels[2])){
            panels[0].unmatch();
        }
        if(panels[1].isUnmatched(panels[0],panels[2])){
            panels[1].unmatch();
        }
        if(panels[2].isUnmatched(panels[0],panels[1])){
            panels[2].unmatch();
        }


        if(panels[0].matched(panels[1],panels[2])){
            let m = new Audio("audio/ジャジャーン.mp3");
            m.play();
            panels[0].match();
        }
        // if(panels[1].matched(panels[0],panels[2])){
        //     panels[1].match();
        // }
        // if(panels[2].matched(panels[0],panels[1])){
        //     panels[2].match();
        // }
        
    }

    //インスタンス作成
    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    //いくつパネルが動いているかの変数
    let panelsLeft = 3;

    const spin = document.getElementById("spin");
    spin.addEventListener("click",()=>{
        if(spin.classList.contains("inactive")){return;}
        spin.classList.add("inactive");
        panels.forEach(panel =>{
            let music = new Audio("audio/syutujin.mp3");
            music.play();
            panel.activate();
            //パネルクラスのスピンメソッドを呼び出す
            panel.spin();
        });
    });
}