// GSAP File
var tl = gsap.timeline()
tl.from(".navbar-left",{
    opacity:0,
    y:-30,
    delay:1,
    duration:1
})
tl.from(".navbar-right a",{
    opacity:0,
    y:-30,
    duration:1,
    stagger:0.3
})
tl.from(".toggle-switch",{
    opacity:0,
    y:-30,
    duration:1
})
