


jQuery(document).ready(function($)
{
//global val
var view_width = window.innerWidth;
var view_height = window.innerHeight;
document.documentElement.style.setProperty("--view_width",view_width+"px");
document.documentElement.style.setProperty("--view_height",view_height+"px");

var c_w = 1920/view_width;
var img_num = 0, b_img_num = 0, star_img_num = 0, b_star_img_num = 0;
var imgs_obj = document.getElementById("obj_bocchi");
var star_imgs_obj = document.getElementById("obj_star");
var obj_github = document.getElementById("obj_github");
var falling_effect = [], stars = [];
var effect_num = 0;
var repeat_effect = 0;
var obj_bocchi_y = 0;
var loading = 0;
var step_fps = 50;

    //onload
    setTimeout(automatic_loading,2000);
    preload_images("imgs","png","0","1","2","3","4","5","6","7","8","9","10","11","12","star_anime0","star_anime1","star_anime2","star_anime3","star_anime4","star_anime5","star_anime6","star_anime7");
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
    
        if (view_width < 1500)
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
                for(var i = 0; i <= 32/c_w; i++)
                {
                var _xx = irandom_range(0,view_width);
                var _yy = irandom_range(0,view_height*1.5);
                stars[i] = document.createElement("img");
                stars[i].style.width = 0;
                stars[i].opacity = 0;
                stars[i].src = "imgs/star2.png";
                stars[i].style.position = "absolute";
                stars[i].style.display = "block";
                stars[i].style.zIndex = 98;
                stars[i].style.top = _yy+"px";
                stars[i].draggable = false;
                stars[i].style.left = _xx+"px";
                document.getElementById("stars_bg").appendChild(stars[i]);
                setTimeout(stars_animation1,100,stars[i],_yy);
                }
            setTimeout(StepEvent,step_fps);
            setTimeout(falling_star,irandom_range(1000,3000));
            }
        loading = 1;
        }
    }
   
    
    $(window).resize(function()
    {
    loading = -1;
    setTimeout(automatic_loading,10);
    })
    
    
    function falling_star()
    {
    star_img_num = 0;
    star_imgs_obj.style.opacity = 1;
    star_imgs_obj.src = "imgs/star_anime0.png";
    var scale__ = irandom_range(616,916)
    star_imgs_obj.style.width = scale__+"px";
    star_imgs_obj.style.top = irandom_range(100,view_height*0.5)+"px";
    star_imgs_obj.style.left = irandom_range(view_width*0.2,view_width*0.45)+"px";
    star_imgs_obj.style.transform = "rotate("+(irandom_range(0,90)-45)+"deg)";
    star_imgs_obj.style.filter = "blur("+scale__/400+"px)" 
    setTimeout(falling_star,irandom_range(4000,10000));
    }
    
    
    function stars_animation1(obj,_yy)
    {
    var scale = irandom_range(5,100)/100;
    obj.style.transition = "top "+floor(scale*100)+"s, opacity 5s";
    obj.style.width = c_w*24*(scale)+"px";
    obj.style.top = (_yy-view_height)+"px";
    obj.style.opacity = irandom_range(10,100)/100;
    setTimeout(stars_animation2,100000*scale,obj,0,_yy);
    }
    
    function stars_animation2(obj,mode)
    {
    obj.style.opacity = 0;
    setTimeout(stars_animation3,5000,obj,mode);
    }
    
    function stars_animation3(obj,mode)
    {
    var _xx = irandom_range(0,view_width);
    if (mode == 0)
    {
    var _yy = irandom_range(view_height,view_height*1.5);
    }
    else
    {
    var _yy = irandom_range(0,view_height);
    }
    obj.style.transition = "none";
    obj.style.left = _xx+"px";
    obj.style.top = _yy+"px";
    setTimeout(stars_animation1,100,obj,_yy);
    }

    
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
            for(var i = 0; i <= 32/c_w; i++)
            {
            var _yy_ = window.getComputedStyle(stars[i]).top;
            stars[i].style.top = floor(parseInt(_yy_)-view_height*10)+"px";
            }
        setTimeout(bocchi_interaction_animation1,5000);
        }
    })
    
    function bocchi_interaction_animation1()
    {
    imgs_obj.style.transition = "none";
        for(var i = 0; i <= 32/c_w; i++)
        {
        stars_animation2(stars[i],1);
        }
    setTimeout(bocchi_interaction_animation2,100);
    }
    
    function bocchi_interaction_animation2()
    {
    imgs_obj.style.top = -300*c_w+"px";
    setTimeout(bocchi_falling_animation,100);
    }
    
    
    function StepEvent()
    {
    //set bocchi animation
    img_num += 0.51*step_fps/50
    star_img_num += 0.7*step_fps/50
        
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
    
    var cal_star_img_num = round(star_img_num);
    if (cal_star_img_num != b_star_img_num)
    {
    b_star_img_num = cal_star_img_num;
        if (cal_star_img_num <= 6)
        {
        star_imgs_obj.src = "imgs/star_anime"+cal_star_img_num+".png";
        }
        else
        {
        star_imgs_obj.style.opacity = 0
        }
    }
    
    var random_val = irandom_range(0,100);
        if (random_val <= 2000/step_fps)
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
            obj_bocchi_y = window.getComputedStyle(imgs_obj).top;
            
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
    falling_effect[num].style.top = floor(parseInt(obj_bocchi_y)-320)+"px";
    falling_effect[num].style.width = "0px";
    }

    function delete_effect(num)
    {
    falling_effect[num].style.transition = "none";
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