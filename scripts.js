


jQuery(document).ready(function($)
{
//global val
var view_width = window.innerWidth;
var view_height = window.innerHeight;
document.documentElement.style.setProperty("--view_width",view_width+"px");
document.documentElement.style.setProperty("--view_height",view_height+"px");

var c_w = 1920/view_width;
var img_num = 0, b_img_num = 0;
var imgs_obj = document.getElementById("obj_bocchi");
var obj_github = document.getElementById("obj_github");
var falling_effect = [];
var effect_num = 0;
var repeat_effect = 0;
var obj_bocchi_y = 0;
var loading = 0;
var step_fps = 50;

    //onload
    setTimeout(automatic_loading,2000);
    preload_images("imgs","png","0","1","2","3","4","5","6","7","8","9","10","11","12");
    window.onload = function()
    {
    automatic_loading();
    }
    
    function automatic_loading()
    {
    view_width = window.innerWidth;
    view_height = window.innerHeight;
    c_w = 1920/view_width;
    document.getElementById("body_t").style.background = "radial-gradient(#1f252c,#0b0d0f)";
    document.documentElement.style.setProperty("--view_width",view_width+"px");
    document.documentElement.style.setProperty("--view_height",view_height+"px");
    
        if (c_w < 0.8)
        {
        step_fps = 100;
        }

        if (loading <= 0)
        {
        imgs_obj.style.cursor = "pointer";
        imgs_obj.style.width = c_w*300+"px";
        imgs_obj.style.position = "absolute";
        imgs_obj.style.display = "block";
        imgs_obj.style.opacity = "1";
        imgs_obj.style.zIndex = 100;
        imgs_obj.draggable = false;
        imgs_obj.style.left = view_width*0.5-150*c_w+"px";
            
        setTimeout(bocchi_falling_animation,100);
            if (loading == 0)
            {
            setTimeout(StepEvent,step_fps);
            }
        loading = 1;
        }
    }
   
    
    $(window).resize(function()
    {
    loading = -1;
    setTimeout(automatic_loading,10);
    })

    
    function bocchi_falling_animation()
    {
    imgs_obj.style.transition = "top 4s";
    imgs_obj.style.top = (view_height/1080*320)+"px";
    obj_github.style.opacity = 1;
    }
    
    
    //animation for obj_github
    obj_github.addEventListener("mouseover",function()
    {
    obj_github.style.opacity = 0.5;
    })

    obj_github.addEventListener("mouseleave",function()
    {
    obj_github.style.opacity = 1;
    })
    
    
    //interaction for bocchi
    imgs_obj.addEventListener("click",function()
    {
        if (imgs_obj.style.top != view_height+320+"px")
        {
        imgs_obj.style.top = view_height+320+"px";
        setTimeout(bocchi_interaction_animation1,5000);
        }
    })
    
    function bocchi_interaction_animation1()
    {
    imgs_obj.style.transition = "top 0s";
    setTimeout(bocchi_interaction_animation2,100);
    }
    
    function bocchi_interaction_animation2()
    {
    imgs_obj.style.top = "-300px";
    setTimeout(bocchi_falling_animation,100);
    }
    
    
    function StepEvent()
    {
    //set bocchi animation
    img_num += 0.51*step_fps/50
        
        if (img_num >= 12.5)
        {
        img_num -= 12.5
        }
    
    
    var cal_img_num = round(img_num);
    if (cal_img_num != b_img_num)
    {
    b_img_num = cal_img_num;
    imgs_obj.src = "imgs/"+cal_img_num+".png";
    }
    
    var random_val = irandom_range(0,100);
        if (random_val <= 250/step_fps)
        {
            for(var i = 0; i <= irandom_range(0,3); i++)
            {
                if (repeat_effect == 0)
                {
                falling_effect[effect_num] = document.createElement("img");
                falling_effect[effect_num].src = "imgs/star2.png";
                }
            
            //random position of effect
            var random_xx = -48+irandom_range(0,104);
            
            //real position of bocchi
            obj_bocchi_y = getComputedStyle(imgs_obj).top;
            
            //css for effect
            falling_effect[effect_num].style.width = c_w*14+"px";
            falling_effect[effect_num].style.position = "absolute";
            falling_effect[effect_num].style.display = "block";
            falling_effect[effect_num].style.opacity = "1";
            falling_effect[effect_num].style.zIndex = 99;
            falling_effect[effect_num].style.top = obj_bocchi_y;
            falling_effect[effect_num].style.marginTop = 64+abs(random_xx - 0)*3+"px";
            falling_effect[effect_num].draggable = false;
            falling_effect[effect_num].style.left = view_width*0.5+"px";
            falling_effect[effect_num].style.marginLeft = random_xx+"px";
                if (repeat_effect == 0)
                {
                document.getElementById("effects").appendChild(falling_effect[effect_num]);
                }
            
            //setting for falling effect
            setTimeout(falling_effect_setting,100,effect_num);
            setTimeout(delete_effect,4100,effect_num);
            effect_num ++
            
                if (effect_num >= 256)
                {
                repeat_effect = 1;
                effect_num = 0
                }
            }
        }
    //step event
    setTimeout(StepEvent,step_fps);
    }
    
    
    function falling_effect_setting(num)
    {
    falling_effect[num].style.transition = "top 4s, opacity 4s, width 4s";
    falling_effect[num].style.opacity = "0";
    falling_effect[num].style.top = parseInt(obj_bocchi_y)-320+"px";
    falling_effect[num].style.width = "0px";
    }

    function delete_effect(num)
    {
    falling_effect[num].style.transition = "top 0s, opacity 0s, width 0s";
    }
    
    // let be = Date.now(),fps=0,info='';
    // requestAnimationFrame(function loop(){
    //     let now = Date.now()
    //     fps = Math.round(1000 / (now - be))
    //     be = now
    //     requestAnimationFrame(loop)
    //     if (fps < 35)
    //     {
    //     kFps.style.color = "red"
    //     kFps.textContent = fps 
    //     } 
    //     if (fps >= 35 && fps <= 41)
    //     {
    //     kFps.style.color = "deepskyblue"
    //     kFps.textContent = fps + " FPS"
    //     } else 
    //     {
    //     kFps.style.color = "white"
    //     kFps.textContent = fps + " FPS"
    //     }
    //     kpFps.value = fps;
    //     info+=(''+new Date()+' '+fps+'\n');
    // })
////////////////////////////////////////////////////////////
})