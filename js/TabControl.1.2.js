function Collection(){this.items=[];}Collection.prototype={add:function(a){this.items.push(a);},clear:function(){this.items=[];},getCount:function(){return this.items.length;},each:function(b){for(var a=0;a<this.getCount();a++){b(this.items[a]);}},indexOf:function(b){var a=-1;for(i=0;i<this.getCount();i++){if(b==this.items[i]){a=i;break;}}return a;},find:function(c){var b=null;for(var a=0;a<this.getCount();a++){if(c(this.items[a])==true){b=this.items[a];break;}}return b;},findAll:function(b){var a=new Collection();this.each(function(c){if(b(c)==true){a.add(c);}});return a;}};function TabPage(b,a){this.trigger=$(b);this.sheet=$(a);}function TabControl(){this.styleName=null;this.tabPages=new Collection();this.currentTabPage=null;this.triggerType="click";this.defaultPage=0;this.enableSlide=false;this.slideInterval=3000;this.autoLoop=false;this.preButton=null;this.nextButton=null;this.onComplete=null;this.options=null;this.currentClassName="current";this.onChanging=new Collection();this.onChanging.add(this.defaultChangingHandler);this.onInit=new Collection();this.onInit.add(this.defaultInitHandler);this.onInit.add(this.autoSlideInitHandler);this.onAdding=new Collection();this.onAdding.add(this.defaultAddingHandler);this._autoSlideEv=null;}TabControl.prototype={add:function(a){this.tabPages.add(a);var b=function(c){c(a);};this.onAdding.each(b);},addRange:function(c,d){if(c.length==0||c.length!=d.length){return;}for(var b=0;b<c.length;b++){var a=new TabPage(c[b],d[b]);this.add(a);}},pre:function(){var a=this.indexOf(this.currentTabPage.trigger);this.select(a-1);},next:function(){var a=this.indexOf(this.currentTabPage.trigger);this.select(a+1);},defaultAddingHandler:function(a){},init:function(){var a=this;var b=function(c){c(a);};if(this.tabPages.getCount()==0){return;}if(this.currentTabPage==null){this.currentTabPage=this.tabPages.items[this.defaultPage];}this.onInit.each(b);if($(this.preButton)){$(this.preButton).onclick=this.GetFunction(this,"pre");}if($(this.nextButton)){$(this.nextButton).onclick=this.GetFunction(this,"next");}},defaultInitHandler:function(b){var a=function(c){V.addListener(c.trigger,b.triggerType,b.selectHanlder,b);O.hide(c.sheet);};b.tabPages.each(a);b.select(b.defaultPage);},autoSlideInitHandler:function(e){if(!e.enableSlide){return;}var a=null;var d=function(){a=setTimeout(function(){e.autoSlideHandler(e);},300);};var c=function(){clearTimeout(a);clearInterval(e._autoSlideEv);};var b=function(f){V.addListener(f.trigger,e.triggerType,c,e);V.addListener(f.sheet,"mouseover",c,e);V.addListener([f.trigger,f.sheet],"mouseout",d,e);};e.tabPages.each(b);e.autoSlideHandler(e);},autoSlideHandler:function(b){var a=b.tabPages.getCount();clearInterval(b._autoSlideEv);b._autoSlideEv=setInterval(function(){var c=b.indexOf(b.currentTabPage.trigger);if(c==-1){return;}c++;if(c>=a){c=0;}b.select(c);},b.slideInterval);},selectHanlder:function(b,c){var a=this.indexOf(c);this.select(a);},select:function(b){var d=null;if(this.autoLoop){if(b<0){b=this.tabPages.getCount()-1;d=this.tabPages.items[b];}else{if(b>=this.tabPages.getCount()){b=0;d=this.tabPages.items[b];}else{d=this.tabPages.items[b];}}}else{if(b<0||b>=this.tabPages.getCount()){return;}d=this.tabPages.items[b];}var a=this;var c=function(e){e(a.currentTabPage,d);};this.onChanging.each(c);this.currentTabPage=d;if($(this.preButton)){$(this.preButton).className="enable";if(b==0){$(this.preButton).className="unenable";}}if($(this.nextButton)){$(this.nextButton).className="enable";if(b==this.tabPages.getCount()-1){$(this.nextButton).className="unenable";}}if(typeof(this.onComplete)=="function"){this.onComplete(this.options,b,this.currentTabPage);}},defaultChangingHandler:function(b,a){if(b.sheet){O.hide(b.sheet);}if(a.sheet){O.show(a.sheet);}O.removeClass(b.trigger,"current");O.addClass(a.trigger,"current");},indexOf:function(a){var d=-1;var b=function(e){return e.trigger==a;};var c=this.tabPages.find(b);if(c!=null){d=this.tabPages.indexOf(c);}return d;},GetFunction:function(a,c,b){return function(){a[c](b);};}};