document.addEventListener("DOMContentLoaded", () => {

    const titleTransition =
        document.querySelector(".title-transition");

    const nextButton =
        document.querySelector("#nextButton");

    const sceneTwo =
        document.querySelector("#sceneTwo");
    
    const kuromiButton =
        document.querySelector("#kuromiButton");

    const kuromiContainer =
         document.querySelector(".kuromi-container");

    const letterButton =
         document.querySelector("#letterButton");
 
    const sceneThree =
         document.querySelector("#sceneThree");
    
    const letterPages =
    document.querySelectorAll(".letter-page");

const letterNext =
    document.getElementById("letterNext");

const letterPageNumber =
    document.getElementById("letterPageNumber");

let currentLetterPage = 0;


    /* ==============================
       第一幕
    ============================== */

    setTimeout(() => {

        titleTransition.classList.add("reveal");

    }, 9000);


    /* ==============================
       点击进入第二幕
    ============================== */

    nextButton.addEventListener("click", () => {

        titleTransition.classList.add("scene-fade-out");

        setTimeout(() => {

            sceneTwo.classList.add("active");

        }, 700);

    });

});

/* ==============================
   Kuromi 彩蛋
============================== */

kuromiButton.addEventListener("click", () => {

    kuromiContainer.classList.add("talking");

});

function kuromiTalk() {

    const container =
        document.querySelector(".kuromi-container");

    if (!container) return;

    /* Kuromi说话 */
    container.classList.add("talking");

    /* 1秒后出现信封 */
    setTimeout(() => {

        container.classList.add("letter-show");

    }, 1000);

}

/* =========================================
   🌠 第二幕流星雨
   ========================================= */

const meteorLayer = document.getElementById("meteorLayer");


function createMeteor(special = false) {

    if (!meteorLayer) return;

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    if (special) {
        meteor.classList.add("special");
    }

    /*
       从屏幕上方随机位置开始
    */

    meteor.style.left =
        Math.random() * 100 + "%";

    meteor.style.top =
        (-10 - Math.random() * 20) + "%";


    /*
       流星飞多远
    */

    meteor.style.setProperty(
        "--meteor-x",
        (180 + Math.random() * 220) + "px"
    );

    meteor.style.setProperty(
        "--meteor-y",
        (180 + Math.random() * 260) + "px"
    );


    /*
       流星速度
    */

    const duration =
        (0.9 + Math.random() * 0.8) + "s";

    meteor.style.setProperty(
        "--meteor-duration",
        duration
    );


    meteorLayer.appendChild(meteor);


    /*
       动画结束以后删除
    */

    meteor.addEventListener(
        "animationend",
        () => {
            meteor.remove();
        }
    );
}


/* =========================================
   🌠 随机流星
   ========================================= */

function randomMeteor() {

    /*
       只有第二幕 active 的时候才出现
    */

    if (
        !document
            .querySelector(".scene-two")
            ?.classList
            .contains("active")
    ) {
        return;
    }


    createMeteor(
        Math.random() < 0.12
    );
}


/* =========================================
   🌠 自动生成
   ========================================= */

setInterval(() => {

    randomMeteor();

}, 1200);


/* =========================================
   🌠 偶尔来一小波流星雨
   ========================================= */

setInterval(() => {

    const scene =
        document.querySelector(".scene-two");

    if (
        !scene ||
        !scene.classList.contains("active")
    ) {
        return;
    }


    /*
       一次出现 3～5 颗
    */

    const count =
        3 + Math.floor(Math.random() * 3);


    for (let i = 0; i < count; i++) {

        setTimeout(() => {

            createMeteor(
                i === count - 1
            );

        }, i * 180);

    }

}, 9000);

/* =========================================
   💌 点击信封进入第三幕
========================================= */

letterButton.addEventListener("click", () => {

    /* 信封开始放大 */
    letterButton.classList.add("opening");

    /* 先让第二幕慢慢消失 */
    setTimeout(() => {

        sceneTwo.classList.remove("active");

    }, 900);


    /* 再进入第三幕 */
    setTimeout(() => {

        sceneThree.classList.add("active");

    }, 1500);

});

/* =========================================
   💌 情书翻页
========================================= */

letterNext.addEventListener("click", () => {

    /* 当前页隐藏 */

    letterPages[currentLetterPage]
        .classList.remove("active");


    /* 下一页 */

    currentLetterPage++;


    /* 如果还没有到最后 */

    if (currentLetterPage < letterPages.length) {

        letterPages[currentLetterPage]
            .classList.add("active");


        /* 更新页码 */

        letterPageNumber.textContent =
            String(currentLetterPage + 1).padStart(2, "0")
            + " / "
            + String(letterPages.length).padStart(2, "0");

	/* ================================
  	 翻页后自动回到新信件顶部
	================================ */

	setTimeout(() => {

    	const currentLetter = letterPages[currentLetterPage];

    	if (!currentLetter) return;

    	/* 强制滚动到当前信件最顶部 */
    	currentLetter.scrollIntoView({
        behavior: "instant",
        block: "start"
    	});

    	/* 同时清除所有可能的内部滚动 */
    	document.querySelectorAll(
        ".letter-page, .letter-content, .letter-paper, .scene-three"
   	 ).forEach(el => {
        el.scrollTop = 0;
   	 });

    	window.scrollTo(0, 0);

	}, 50);



        /* 最后一页 */

       if (currentPage === pages.length - 1) {

    nextBtn.textContent = "读完了";

    nextBtn.onclick = function () {

        /* 信件淡出 */
        pages.forEach(page => {
            page.style.transition = "opacity 0.8s ease";
            page.style.opacity = "0";
        });

        /* 等淡出完成后隐藏 */
        setTimeout(() => {

    /* 隐藏信件 */
    pages.forEach(page => {
        page.style.display = "none";
    });

    nextBtn.style.display = "none";

    if (pageNumber) {
        pageNumber.style.display = "none";
    }

    /* 回到第三幕 */
    const sceneThree = document.getElementById("sceneThree");

    if (sceneThree) {
        sceneThree.classList.add("active");
    }

}, 800);
    };
}
    }

});