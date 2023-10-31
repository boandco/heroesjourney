document.querySelectorAll('a, .btn').forEach(function(x) {
  const cursorEl = document.querySelector('#cursor');
  if (cursorEl) {
    x.addEventListener('mouseover', function() {
      cursorEl.classList.add('active');
    });
    x.addEventListener('mouseleave', function() {
      cursorEl.classList.remove('active');
    });
  }
});

//Mouse cursor
const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const iPad = !!(navigator.userAgent.match(/(iPad)/)
  || (navigator.platform === "MacIntel" && typeof navigator.standalone !== "undefined"));

var showCursor = true;

if (iOS || iPad) {
  document.getElementById('cursor').remove();
  showCursor = false;
}

if (showCursor) {
  var mouseX = window.innerWidth/2,
    mouseY = window.innerHeight/2;
  var cursor = {
    el: document.querySelector('#cursor'),
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    w: 25,
    h: 25,
    update: function() {
      l = this.x - this.w/2;
      t = this.y - this.h/2;
      this.el.style.transform = `translate3d(${l}px,${t}px,0)`;
    }
  }
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  setInterval(move,1000/60);
  function move() {
    cursor.x = lerp (cursor.x, mouseX, 0.1);
    cursor.y = lerp (cursor.y, mouseY, 0.1);
    cursor.update();
  }
  function lerp (start, end, amt) {
    return (1-amt)*start+amt*end;
  }
}

if (document.querySelector('.accordion_trigger')) {
  document.querySelectorAll('.accordion_trigger').forEach((x) => {
    x.addEventListener('click', () => {
      if (x.getAttribute('data-limit') == 'true') {
        document.querySelectorAll(`.accordion__item.${x.getAttribute('data-type')}.active`).forEach((el) => {
          el.classList.remove('active')
        })
      }
      let target = x.getAttribute('data-for');
      document.getElementById(`${target}`).classList.toggle('active');
    })
  });
}