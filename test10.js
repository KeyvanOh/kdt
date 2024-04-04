
  const FRAME_WIDTH = 800;
  const FRAME_HEIGHT = 800;
  const RP = Math.PI / 45;
  const TWO_PI = Math.PI * 2;
  const V = 4;
  const GRID_MAX = 256;
  const bg_1 = "https://github.com/KeyvanOh/kdt/blob/main/src/bg1.png?raw=true";
  const character_1_0 =
    "https://github.com/KeyvanOh/kdt/blob/main/src/test3.png?raw=true";
  const character_1_1 =
    "https://github.com/KeyvanOh/kdt/blob/main/src/test3-1.png?raw=true";
  const character_1_2 =
    "https://github.com/KeyvanOh/kdt/blob/main/src/test3-2.png?raw=true";
  const character_1_3 =
    "https://github.com/KeyvanOh/kdt/blob/main/src/test3-3.png?raw=true";

  let d = $(document);
  let eventNumber = 0;
  let gridNumberHeavy = 0;

  let r = 0;
  let h = 0;
  let sin = 0;

  //console.log(Date.now());

  let member_id = "";
  let timestamp_latest = Date.now();
  let timestamp_first = timestamp_latest;
  let member_name = "";
  let model_number = 0;
  let map_number = 0;
  let tile_number = 0;
  let is_moving = 0;
  let from_where = 0;
  let is_flip = 0;
  let is_chaton = 0;
  let chat_text = "";
  let is_jump = 0;

  d.ready(function () {
    let body = $("main");
    let frame = $('<div id="frame"></div>');
    let characterBox = $('<div id="characterBox"></div>');
    //let characterImage = $('<img src="src/test3.png" />');
    let characterImage = $("<img src=" + character_1_0 + " />");

    let debugText = $("<p>");
    let thoughtText = $("<p>");

    characterImage.css("position", "absolute");

    debugText.css("position", "absolute").css("color", "yellow").text("dev");
    thoughtText.css("position", "absolute").css("color", "pink");
    characterBox
      .append(characterImage)
      //.append(thoughtText)
      .append(debugText)
      .css("background", "rgba(128, 0, 128, 0.5)")
      .css("width", "64px")
      .css("height", "64px")
      .css("position", "absolute")
      .css("position", "relative");
    //let bgImage = $('<img src="src/bg1.png">');
    let bgImage = $("<img src=" + bg_1 + ">");
    bgImage.css("position", "absolute");
    let inputText = $('<input type="text"/>');
    inputText
      .css("position", "absolute")
      .css("opacity", "0.0")
      .css("top", "-1024px");

    frame.append(bgImage);

    for (let i = 0; i < GRID_MAX; i++) {
      let grid = $("<div></div>");
      grid
        .addClass("grid" + i)
        //.attr("id", i)
        .css("position", "absolute")
        .css("width", "64px")
        .css("height", "64px")
        //.css("background", "green")
        //.css("opacity", "0.5")
        .css("color", "purple")
        .css("border-right", "1px solid gold")
        .css("border-top", "1px solid gold")
        .text(i)
        .appendTo(frame);

      if (i == 226) {
        //console.log(grid);
        grid.css("background", "white");
      }
    }

    frame
      //.append(bgImage)
      .append(characterBox)
      .append(thoughtText)
      .append(inputText)
      //.css("background", "black")
      //.css("background", "rgb(10, 10, 10)")
      .css("background", "red")
      .css("overflow", "hidden")
      .css("width", FRAME_WIDTH + "px")
      .css("height", FRAME_HEIGHT + "px")
      .css("position", "relative")
      .css("margin", "auto");
    let left = bgImage.position().left;
    let top = bgImage.position().top;
    let leftMoved = left;
    let topMoved = top;
    let widthV = document.documentElement.clientWidth;
    let heightV = document.documentElement.clientHeight;

    body.append(frame);
    let jump = false;
    let v = V;
    let t = 0;
    let right = true;
    let keys = new Set([]);
    let thoughtOn = false;
    //is_chaton = 0;
    d.keydown(function (e) {
      let keyNumber = e.which;
      if (thoughtOn == false) {
        if (keyNumber >= 37 && keyNumber <= 40) {
          keys.add(keyNumber);
        } else if (keyNumber == 32) {
          if (jump == false) {
            jump = true;
            v = V;
            t = 0;
            is_jump = 1;
          }
        } else if (keyNumber == 13) {
          inputText.val("");
          thoughtOn = true;
          is_chaton = 1;
          thoughtText.text("(...)");
        }
      } else {
        if (keyNumber == 13) {
          thoughtOn = false;
          if (thought != "") {
            thoughtText.text("(" + thought + ")");
          } else {
            thoughtText.text("");
          }
          chat_text = thought;
          is_chaton = 0;
        }
      }
    });
    //is_chaton = thoughtOn;
    d.keyup(function (e) {
      let keyNumber = e.which;
      keys.delete(keyNumber);
    });
    let ms = 0;
    //let r = 0;
    //let h = 0;
    let gridNumber = 0;
    let gridNumberHeavy = 0;
    setInterval(function () {
      widthV = document.documentElement.clientWidth;
      //heightV = document.documentElement.clientHeight;
      heightV = document.documentElement.clientHeight - $("header").height();
      for (k of keys) {
        //if (k == 39) {
        if (k == 37) {
          //if (left <= FRAME_WIDTH - 64 - 4) {
          /*
           if (left <= widthV - 64 - 4) {
             leftMoved += 4;
           }
           */
          leftMoved += 4;
          if (right != false) {
            right = false;
            characterImage.css("transform", "scaleX(-1)");
            is_flip = 1;
          }
        }
        //if (k == 37) {
        if (k == 39) {
          /*
           if (left >= 4) {
             leftMoved -= 4;
           }
           */
          leftMoved -= 4;
          if (right != true) {
            right = true;
            characterImage.css("transform", "scaleX(1)");
            is_flip = 0;
          }
        }

        //if (k == 38) {
        if (k == 40) {
          //if (top >= 4) {
          topMoved -= 4;
          //}
        }
        //if (k == 40) {
        if (k == 38) {
          //if (top <= FRAME_HEIGHT - 64 - 4) {
          //if (top <= heightV - 64 - 4) {
          topMoved += 4;
          //}
        }
        gridNumber =
          (Math.floor(-leftMoved / 64) % 16) +
          Math.floor((1024 - topMoved) / 64) * 16;

        let mapNumber = -1;
        //console.log(topMoved);

        //if (leftMoved - 32 < 0 && gridNumberHeavy >= 0) {
        if (leftMoved - 32 < 0 && gridNumberHeavy >= 0 && topMoved > -32) {
          mapNumber = Math.floor((-leftMoved + 32) / 1024);
        }

        map_number = mapNumber;

        //debugText.text(`${gridNumberHeavy}, ${leftMoved}`);
        debugText.text(`${gridNumberHeavy}, ${mapNumber}`);

        let tempGridNumberHeavy = gridNumberHeavy;
        if (-leftMoved - (gridNumber % 16) * 64 > 32) {
          //if (gridNumber % 16 != 0) {
          //  gridNumberHeavy = gridNumber + 1 + 16;
          //} else if ((gridNumber + 1) % 16 != 0) {
          if ((gridNumber + 1) % 16 != 0) {
            gridNumberHeavy = gridNumber + 1;
          } else {
            //gridNumberHeavy = -1;
            gridNumberHeavy = gridNumber + 1 - 16;
          }
          //gridNumberHeavy = gridNumber + 1;
        } else {
          gridNumberHeavy = gridNumber;
        }
        //if (gridNumberHeavy != -1) {
        if (Math.floor((1024 - topMoved) % 64) < 32) {
          /*
           if (gridNumberHeavy - 16 >= 0) {
             gridNumberHeavy = gridNumberHeavy - 16;
           } else {
             gridNumberHeavy = -2;
           }
           */
          gridNumberHeavy = gridNumberHeavy - 16;
        }
        gridNumberHeavy = gridNumberHeavy % 256;

        tile_number = gridNumberHeavy;

        if (tempGridNumberHeavy != gridNumberHeavy) {
          //gridNumberHeavyOld = tempGridNumberHeavy;
          let grid = $(".grid" + tempGridNumberHeavy);
          //$(".grid" + tempGridNumberHeavy).css("background", "transparent");
          //console.log(grid.css("background"));
          if (grid.css("background") == "rgb(255, 165, 0)") {
            grid.css("background", "transparent");
          }

          //grid.css("background", "transparent");
          //is_moving = 1;
        } else {
          //is_moving = 0;
        }

        let grid = $(".grid" + gridNumberHeavy);
        //console.log(grid.css("background"));
        if (grid.css("background") == "none") {
          grid.css("background", "orange");
        }
        //$(".grid" + gridNumberHeavy).css("background", "orange");
        //}
        //$(".grid" + gridNumberHeavy).css("background", "red");
      }
      //is_flip = right;
      frame.css("width", widthV + "px");
      frame.css("height", heightV + "px");
      characterBox.css("left", widthV / 2 + "px");
      characterBox.css("top", heightV / 2 + "px");
      bgImage.css("left", leftMoved + widthV / 2 + "px");
      bgImage.css("top", topMoved + heightV / 2 - 1024 + 64 + "px");

      for (let i = 0; i < GRID_MAX; i++) {
        let grid = $(".grid" + i);
        grid
          .css("left", leftMoved + widthV / 2 + 64 * (i % 16) + "px")
          .css(
            "top",
            topMoved + heightV / 2 - 1024 + 64 + 64 * Math.floor(i / 16) + "px"
          );
      }

      ms++;
      if (ms >= 20) {
        //if (characterImage.attr("src") == "src/test3.png") {
        if (characterImage.attr("src") == character_1_0) {
          characterImage.attr("src", character_1_1);
        } else if (characterImage.attr("src") == character_1_1) {
          characterImage.attr("src", character_1_3);
        } else if (characterImage.attr("src") == character_1_3) {
          characterImage.attr("src", character_1_2);
        } else {
          characterImage.attr("src", character_1_0);
        }
        ms -= 20;
      }
      r += RP;
      if (r >= TWO_PI) {
        r -= TWO_PI;
      }
      //let sin = Math.sin(r);
      sin = Math.sin(r);
      if (jump) {
        h -= v;
        t += 0.01;
        v -= t;
        if (h >= 0) {
          h = 0;
          jump = false;
          is_jump = 0;
        }
      }
      //console.log($(".grid226"));
      //is_jump =

      characterImage.css("top", sin * 8 + h + "px");
      thoughtText.css("top", heightV / 2 + sin * 8 + h - 20 + "px");
      thoughtText.css("left", widthV / 2 + "px");
      if (thoughtOn == true) {
        inputText.focus();
        thought = inputText.val();
      }
      //console.log(gridNumberHeavy);
      timestamp_latest = Date.now();
    }, 10);
  });
