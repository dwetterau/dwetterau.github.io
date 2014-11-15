//Scored with a program written in java offline
scores = [250.0, 233.78582202111613, 231.14630467571646, 224.35897435897436, 221.342383107089, 220.58823529411768, 219.45701357466064, 212.2926093514329, 210.40723981900456, 209.6530920060332, 209.2760180995475, 208.5218702865762, 208.14479638009053, 204.75113122171945, 204.3740573152338, 203.99698340874812, 203.61990950226246, 203.24283559577677, 202.11161387631978, 201.35746606334845, 199.84917043740575, 198.34087481146307, 197.96380090497738, 195.70135746606334, 191.17647058823528, 188.15987933634992, 187.0286576168929, 186.65158371040724, 184.7662141779789, 183.25791855203622, 182.50377073906486, 180.61840120663652, 179.11010558069384, 177.9788838612368, 176.09351432880845, 175.7164404223228, 174.58521870286577, 174.58521870286577, 174.20814479638008, 172.32277526395177, 167.420814479638, 166.28959276018102, 165.158371040724, 160.25641025641028, 158.37104072398193, 157.99396681749624, 155.7315233785822, 151.20663650075417, 149.3212669683258, 149.3212669683258, 148.9441930618401, 148.19004524886878, 146.6817496229261, 144.79638009049776, 143.66515837104075, 141.77978883861238, 138.76319758672702, 137.63197586727, 137.63197586727, 135.74660633484166, 134.23831070889898, 131.59879336349925, 131.2217194570136, 129.7134238310709, 122.92609351432881, 122.92609351432881, 122.92609351432881, 116.13876319758673, 113.12217194570135, 113.12217194570135, 111.61387631975867, 108.22021116138764, 103.31825037707391, 101.05580693815989, 100.67873303167423, 97.28506787330318, 96.53092006033182, 94.2684766214178, 93.89140271493214, 85.97285067873302, 79.18552036199097, 75.03770739064856, 68.25037707390649, 63.34841628959277, 63.34841628959277, 54.29864253393665, 53.921568627450974, 47.88838612368024, 39.592760180995484, 31.674208144796385, 27.149321266968325, 26.772247360482652, 18.853695324283564];
chars = ['B', 'M', 'W', 'R', 'N', '&', 'D', '0', 'H', 'Q', 'O', '8', 'K', '6', '#', '9', 'b', 'd', 'U', 'E', '@', 'G', 'm', 'Z', 'A', 'X', 'h', 'P', 'S', 'k', '$', 'e', 'V', '5', 'a', 'g', 'q', 'p', '4', '3', 'w', '2', 'F', 'o', 'I', 'n', 'u', 'C', '1', 'Y', 'i', 'f', 's', 't', 'J', '%', 'z', '7', 'x', 'T', 'l', 'v', 'L', 'y', 'c', '}', '{', '?', '+', '=', '[', 'j', 'r', '<', '>', ']', '*', '(', ')', '|', '!', '\'', '/', "\"", '^', ':', ';', '~', '-', "\'", '.', ',', '`'];

var picture = "images/origback.jpg";
var asciiType = 0;
var canvasEl = 0;
var context = 0;

var cwidth = 0;
var cheight = 0;

init = function() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    canvasEl = c;
    context = ctx;

    var params = getParams();
    asciiType = params['type'];

    if (asciiType == undefined) {
        asciiType = 1;
    }
    cwidth = Math.max(document.body.clientWidth == undefined ? 0 : document.body.clientWidth
                 , document.width == undefined ? 0 : document.width);

    cheight = getDocHeight();

    canvasEl.width = cwidth;
    canvasEl.height = cheight;


    var imageObj = new Image();

    imageObj.onload = function() {
        ctx.drawImage(imageObj, 0, 0, canvasEl.width, canvasEl.height);
        convertImage(canvasEl, context);
    };
    imageObj.src = picture;
}

function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

getParams = function() {
    var params = {};
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    while (match = search.exec(query))
       params[decode(match[1])] = decode(match[2]);

    return params;
}
var onOriginal = false;
showImage = function() {
    onOriginal = true;
    canvasEl.style.display = 'block';
    document.getElementById("picture").style.display = 'none';
    var imageObj = new Image();

    imageObj.onload = function() {
        context.drawImage(imageObj, 0, 0, canvasEl.width, canvasEl.height);
    };
    imageObj.src = picture;

}

changeType = function(type) {
    onOriginal = false;
    asciiType = type;
    convertImage(canvasEl, context);
}

changePicture = function(image) {
    var bool = false;
    if (picture != image) {
        bool = true;
    }
    picture = image;
    if (bool) {
        var imageObj = new Image();

        imageObj.onload = function() {
            context.drawImage(imageObj, 0, 0, canvasEl.width, canvasEl.height);
            if (!onOriginal) 
                convertImage(canvasEl, context);
        };
        imageObj.src = picture;
    }
}

function textWidthAndHeight() {
  var div = document.getElementById('fonttest');
  if (!div) {
    div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.top = '-1000px';
    div.setAttribute('id', 'fonttest');
    div.innerText = 'X';
    document.body.appendChild(div);
  }
  return {
    width: div.clientWidth,
    height: div.clientHeight
  };
}

function convertImage(can, ctx) {
    var type = asciiType;
    var imgd = ctx.getImageData(0,0,cwidth, cheight);
    var pix = imgd.data;
    
    var div = document.getElementById('picture');
    div.textContent = '';
    div.style.display = 'block';
    
    //console.log(textWidthAndHeight());

    var charWidth = 7;
    var charHeight = 13;
    
    var rows = Math.floor((cheight) / charHeight);
    var cols = Math.floor((cwidth - 60) / charWidth);

    var comma = ',';

    for(var r = 0; r < rows; r++) {
        var row = document.createElement('div');
        row.className = 'textRow';
        for (var c = 0; c < cols; c++) {
            var num = 0;
            var total = 0;
            var totalRed = 0;
            var totalGreen = 0;
            var totalBlue = 0;
            for (var x = c*charWidth; x < cwidth && x < (c+1)*charWidth; x++) {
                for (var y = r*charHeight; y < cheight && y < (r+1)*charHeight; y++) {
                    num++;
                    var index = 4*(y*can.width + x);
                    totalRed += pix[index];
                    totalGreen += pix[index+1];
                    totalBlue += pix[index+2];
                }
            }
            var red = Math.floor(totalRed/num);
            var green = Math.floor(totalGreen/num);
            var blue = Math.floor(totalBlue/num);
            
            var span = document.createElement('span');
            span.className ='character';
            if (type >= 1) {
                span.style.color = 'rgb(' + Math.max(red-15, 0) + comma + Math.max(green-15, 0) + comma + Math.max(blue-15,0) +")";
            }                
            if (type >= 2) {
              span.style.backgroundColor = 'rgb(' + red + comma + green + comma + blue + ")";
            }
            span.textContent = getChar(255-getScore(totalRed, totalGreen, totalBlue, num));
            row.appendChild(span);
        }
        div.appendChild(row);
    }
    can.style.display = 'none';
}

getScore = function(totalRed, totalGreen, totalBlue, num) {
    if (num == 0) {
        return 0;
    }
    return (totalRed/num + totalGreen/num + totalBlue/num)/3;
}

getChar = function(score) {
    for (var i = 0; i < scores['length'] - 1; i++) {
        if (score > scores[i+1]) {
            return chars[i];
        }
    }
    return chars[chars['length'] -1];
}

init();
