/* Scroll choreography, ported from the Dr Shiatis build.

   Three reveal kinds, all once-only:
     [data-reveal]        block fades and rises
     [data-img-reveal]    clip opens and the image settles out of a zoom
     [data-rule-reveal]   the accent hairline draws itself in

   Inside [data-reveal-group] the direct children stagger rather than all
   moving together, which is what stops a page of reveals reading as one
   blanket fade. GSAP does this with a timeline; a transition-delay per
   sibling gets the same result without the dependency.

   This sweeps on scroll rather than using an IntersectionObserver. An
   observer samples, so a fast scroll or a jump to an anchor can carry an
   element past the viewport between samples and leave it stuck at
   opacity 0 forever. A rAF-throttled pass over the remaining elements
   cannot skip one, and the list only shrinks.

   prefers-reduced-motion is handled in CSS; here we simply reveal
   everything up front so nothing is left mid-transition. */
(function () {
  var SEL = '[data-reveal],[data-img-reveal],[data-rule-reveal]';
  var reveal = function (el) { el.classList.add('in'); };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(SEL).forEach(reveal);
    return;
  }

  var STAGGER = 100; // ms between siblings in a group

  // A group reveals as one unit, its children offset by transition-delay.
  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    Array.prototype.filter
      .call(group.querySelectorAll(SEL), function (el) {
        return el.closest('[data-reveal-group]') === group;
      })
      .forEach(function (el, i) {
        el.dataset.grouped = '1';
        el.style.transitionDelay = i * STAGGER + 'ms';
      });
  });

  // Watch groups as a whole, plus anything not inside one.
  var pending = [].concat(
    Array.prototype.slice.call(document.querySelectorAll('[data-reveal-group]')),
    Array.prototype.filter.call(document.querySelectorAll(SEL), function (el) {
      return !el.dataset.grouped;
    })
  );

  var sweep = function () {
    var limit = window.innerHeight * 0.88;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top > limit) return true;
      if (el.hasAttribute('data-reveal-group')) {
        el.querySelectorAll(SEL).forEach(reveal);
      } else {
        reveal(el);
      }
      return false;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    }
  };

  var queued = false;
  var onScroll = function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { sweep(); queued = false; });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('load', onScroll);
  sweep();

  // The process spine fills as you read down it.
  var spine = document.querySelector('[data-spine]');
  if (spine) {
    var fill = spine.querySelector('[data-spine-fill]');
    var tick = function () {
      var r = spine.getBoundingClientRect();
      var p = (window.innerHeight * 0.55 - r.top) / r.height;
      fill.style.transform = 'scaleY(' + Math.min(1, Math.max(0, p)) + ')';
    };
    var sq = false;
    window.addEventListener('scroll', function () {
      if (sq) return;
      sq = true;
      requestAnimationFrame(function () { tick(); sq = false; });
    }, { passive: true });
    window.addEventListener('resize', tick, { passive: true });
    tick();
  }
})();
