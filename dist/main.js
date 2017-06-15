"use strict";function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}function getWorkersArray(e,t){return t.memory.jobs[e].workers}function getTasksArray(e,t){return t.memory.jobs[e].tasks}function getTaskAt(e,t,o){return o.memory.jobs[t].tasks[e]}function initialize(e){Memory.rooms[e.name]={},Memory.rooms[e.name].sc||(Memory.rooms[e.name].sc=e.find(FIND_SOURCES).length),Memory.rooms[e.name].pc||(Memory.rooms[e.name].pc=3e3*Memory.rooms[e.name].sc),Memory.rooms[e.name].pt||(Memory.rooms[e.name].pt=Math.ceil(Memory.rooms[e.name].pc/300)),Memory.rooms[e.name].jobs||(Memory.rooms[e.name].jobs={list:[],whack:{workers:[],tasks:[]},construct:{workers:[],tasks:[]},deposit:{workers:[],tasks:[]},collect:{workers:[],tasks:[]},aid:{workers:[],tasks:[]},fix:{workers:[],tasks:[]},sweep:{workers:[],tasks:[]},mine:{workers:[],tasks:[]},eat:{workers:[],tasks:[]},upgrade:{workers:[],tasks:[]}}),Memory.rooms[e.name].miningSpots||(Memory.rooms[e.name].miningSpots=e.miningSpots(e.find(FIND_SOURCES)))}function queen(e){var t=e.room,o=t.find(FIND_STRUCTURES,{filter:function(e){return"container"==e.structureType}});if(o.length){console.log(o);for(var s in o)o[s].report()}var r=t.find(FIND_DROPPED_RESOURCES);if(r.length)for(var i in r){var m=r[i];m.report()}Memory.rooms[t.name]||(initialize(t),t.memory.jobs.upgrade.tasks.add(t.controller.id),t.memory.jobs.deposit.tasks.add(e.id),t.memory.jobs.eat.tasks.add(e.id));var a=t.controller.level,n=Memory.recipes.frog,c=Memory.recipes.toad,y=Memory.recipes.newt,h=t.memory.jobs.collect.tasks?t.memory.jobs.collect.tasks.size:0,p=t.memory.jobs.construct.tasks?t.memory.jobs.construct.tasks.size:0,R=t.memory.jobs.sweep.tasks?t.memory.jobs.sweep.tasks.size:0;if(t.roleCount("toad")<t.memory.sc){e.spawnCreep(c,a)}else if(t.roleCount("newt")<h){console.log(h+":"+R);e.spawnCreep(y,a)}else if(t.roleCount("frog")<p){e.spawnCreep(n,a)}}function tower(e){var t=e.pos.findInRange(FIND_HOSTILE_CREEPS,15);Memory.towers[e.id]||(Memory.towers[e.id]={}),Memory.towers[e.id].mode||(Memory.towers[e.id].mode="alert"),e.energy<=900||t.length>0?Memory.towers[e.id].mode="alert":e.energy>900&&(Memory.towers[e.id].mode="repair");var o=Memory.towers[e.id].mode;if("alert"==o){var s=e.room.find(FIND_MY_CREEPS,{filter:function(e){return e.hits<e.hitsMax}});t.length>0?(t.length>1&&t.sort(function(e,t){return e.hits-t.hits}),e.attack(t[0])):s.length>0&&(s.length>1&&s.sort(function(e,t){return e.hits-t.hits}),e.heal(s[0]))}else if("repair"==o){var r=e.room.find(FIND_STRUCTURES,{filter:function(e){return e.hitsMax/2>e.hits&&e.hits<1e5}});r.length>0&&(r.length>1&&r.sort(function(e,t){return e.hits-t.hits}),e.repair(r[0]))}else t.length>0&&(t.length>1&&t.sort(function(e,t){return e.hits-t.hits}),e.attack(t[0]))}Object.defineProperty(Array.prototype,"add",{enumerable:!1,value:function(e){if(this.length){var t,o=new Set(this);console.log("set size: "+o.size),console.log("does set have "+e+": "+o.has(e)),o.has(e)||(o=o.add(e)),console.log("set size after adding "+e+": "+o.size),o.forEach(function(e,t,o){}),this.splice.apply(this,[0,this.length].concat(_toConsumableArray(o))),console.log("after splice"),(t=console).log.apply(t,_toConsumableArray(o)),console.log(this)}else this.push(e)}}),Object.defineProperty(Array.prototype,"delete",{enumerable:!1,value:function(e){if(this.length){var t=new Set(this);t.has(e)&&(t=t.delete(e)),this.splice.apply(this,[0,this.length].concat(_toConsumableArray(t)))}return this}}),Object.defineProperty(Array.prototype,"has",{enumerable:!1,value:function(e){var t=this;return new Set(t).has(e)}}),ConstructionSite.prototype.report=function(){this.createTask("construct")},ConstructionSite.prototype.debrief=function(e){this.deleteTask("construct")},ConstructionSite.prototype.createTask=function(e){this.room.memory.jobs[e].tasks.add(this.id),this.room.memory.jobs.list.add(this.id)},ConstructionSite.prototype.deleteTask=function(e){this.room.memory.jobs[e].tasks.delete(this.id),this.room.memory.jobs.list.delete(this.id)},ConstructionSite.prototype.isTask=function(e){this.room.memory.jobs[e].tasks.has(this.id)},ConstructionSite.prototype.getTaskAt=function(e,t){return[].concat(_toConsumableArray(this.room.memory.jobs[t].tasks))[e]},ConstructionSite.prototype.getTaskIndex=function(e){return[].concat(_toConsumableArray(this.room.memory.jobs[e].tasks)).indexOf(this.id)},StructureContainer.prototype.report=function(){this.store.energy>=50&&this.createTask("collect"),this.hits<1e4&&this.createTask("fix")},StructureContainer.prototype.debrief=function(){0===this.store.energy&&this.deleteTask("collect"),this.hits>1e4&&this.deleteTask("fix")},StructureController.prototype.report=function(){return!0},StructureExtension.prototype.debrief=function(){return!0},Creep.prototype.setWorker=function(e){this.room.memory.jobs[e].workers.add(this.name)},Creep.prototype.deleteWorker=function(e){this.room.memory.jobs[e].workers.delete(this.name)},Creep.prototype.isWorker=function(e){this.room.memory.jobs[e].workers.has(this.name)},Creep.prototype.getWorkerAt=function(e,t){return this.room.memory.jobs[t].workers[e]},Creep.prototype.getWorkerIndex=function(e){return this.room.memory.jobs[e].workers.indexOf(this.name)},Creep.prototype.deleteWorkerAll=function(){for(var e in this.memory.jobs)this.deleteWorker(e)},Creep.prototype.getAssignment=function(e,t){return this.memory.jobs[e]},Creep.prototype.setAssignment=function(e,t){this.memory.jobs[e]=t},Creep.prototype.deleteAssignment=function(e){this.memory.jobs[e]=null},Creep.prototype.deleteAllAssignments=function(){for(var e in this.memory.jobs)this.deleteAssignment(e)},Creep.prototype.assignTask=function(e){this.isWorker(e)||(console.log("adding"+this.name+" to "+e),this.setWorker(e));var t=this.getWorkerIndex(e),o=0,s=getTaskAt(t,e,this.room);if(s)return this.setAssignment(e,s),!0;var r=getTasksArray(e,this.room).length;return o=getWorkersArray(e,this.room).length>r?t%r:t,this.setAssignment(e,getTaskAt(o,e,this.room)),!0},Creep.prototype.gatherAura=function(){var e=this.pos.findInRange(FIND_DROPPED_RESOURCES,1,{filter:function(e){return e.resourceType==RESOURCE_ENERGY}}),t=this.pos.findInRange(FIND_STRUCTURES,1,{filter:function(e){return e.structureType==STRUCTURE_CONTAINER}}),o=this.pos.findInRange(FIND_STRUCTURES,1,{filter:function(e){return e.structureType==STRUCTURE_STORAGE}});"newt"!=this.memory.role&&"toad"!=this.memory.role&&0===this.withdraw(o[0],RESOURCE_ENERGY)&&this.say(Memory.emoji.sogood),"toad"!=this.memory.role&&0===this.withdraw(t[0],RESOURCE_ENERGY)&&this.say(Memory.emoji.sogood),0===this.pickup(e[0])&&this.say(Memory.emoji.sogood)},Creep.prototype.depositAura=function(){var e=this.pos.findInRange(FIND_MY_STRUCTURES,1,{filter:function(e){return e.structureType==STRUCTURE_EXTENSION}});for(var t in e)0===this.transfer(e[t],RESOURCE_ENERGY)&&this.say(Memory.emoji.sogood)},Creep.prototype.assignSpot=function(){for(var e in this.room.sources)if(this.room.lastAssignedSource!=e)for(var t in this.room.sources[e].spots){if(!Game.getObjectById(this.room.sources[e].spots[t]))return this.room.sources[e].spots[t]=this.name,this.room.lastAssignedSource=e,e;if(this.memory.priority>Game.getObjectById(this.room.sources[e].spots[t]).memory.priority)return Game.getObjectById(this.room.sources[e].spots[t]).suicide(),this.room.sources[e].spots[t]=this.name,this.room.lastAssignedSource=e,e}return this.pos.findClosestByRange(FIND_SOURCES).id},StructureExtension.prototype.report=function(){this.store.energy>this.energyCapacity&&this.createTask("deposit"),this.hits<this.hitsMax&&this.createTask("fix")},StructureExtension.prototype.debrief=function(){this.store.energy===this.energyCapacity&&this.deleteTask("deposit"),this.hits===this.hitsMax&&this.deleteTask("fix")},OwnedStructure.prototype.createTask=function(e){this.room.memory.jobs[e].tasks.add(this.id),this.room.memory.jobs.list.add(this.id)},OwnedStructure.prototype.deleteTask=function(e){this.room.memory.jobs[e].tasks.delete(this.id),this.room.memory.jobs.list.delete(this.id)},OwnedStructure.prototype.isTask=function(e){this.room.memory.jobs[e].tasks.has(this.id)},OwnedStructure.prototype.getTaskIndex=function(e){return this.room.memory.jobs[e].tasks.indexOf(this.id)},Resource.prototype.report=function(){this.enumerable="enum",Object.defineProperty(this,"nonEnum",{enumerable:!1,value:"noEum"}),this.createTask("sweep")},Resource.prototype.debrief=function(e){this.deleteTask("sweep")},Resource.prototype.createTask=function(e){this.room.memory.jobs.sweep.tasks.add(this.id),this.room.memory.jobs.list.add(this.id)},Resource.prototype.deleteTask=function(e){this.room.memory.jobs.sweep.tasks.delete(this.id),this.room.memory.jobs.list.delete(this.id)},Resource.prototype.isTask=function(e){this.room.memory.jobs.sweep.tasks.has(this.id)},Resource.prototype.getTaskAt=function(e,t){return[].concat(_toConsumableArray(this.room.memory.jobs.sweep.tasks))[e]},Resource.prototype.getTaskIndex=function(e){return[].concat(_toConsumableArray(this.room.memory.jobs.sweep.tasks)).indexOf(this.id)},Room.prototype.roleCount=function(e){return this.find(FIND_MY_CREEPS,{filter:function(t){return t.memory.role==e}}).length},Room.prototype.miningSpots=function(e){var t=this,o=0,s=[];return e.forEach(function(e){var r=e.id;console.log("adding "+r+" to jobs list"),t.memory.jobs.mine.tasks.add(r),s=t.lookForAtArea("terrain",e.pos.y-1,e.pos.x-1,e.pos.y+1,e.pos.x+1,!0);for(var i=0;i<s.length;i++)"plain"!=s[i].terrain&&"swamp"!=s[i].terrain||(o++,t.memory.sources||(t.memory.sources={}),t.memory.sources[r]||(t.memory.sources[r]={}),t.memory.sources[r].spots||(t.memory.sources[r].spots={}),t.memory.sources[r].spots[o]||(t.memory.sources[r].spots[o]="empty"))}),o},StructureSpawn.prototype.report=function(){this.energy>this.energyCapacity&&this.createTask("deposit"),this.hits<this.hitsMax&&this.createTask("fix")},StructureSpawn.prototype.debrief=function(){this.store.energy===this.energyCapacity&&this.deleteTask("deposit"),this.hits===this.hitsMax&&this.deleteTask("fix")},StructureSpawn.prototype.spawnCreep=function(e,t){switch(this.createCreep(e.parts[t],(new Date).getUTCMilliseconds(),e.options)){case-3:console.log("There is already a creep with this name");break;case-10:console.log("Body part array not properly formed: "),console.log(JSON.stringify(e.parts[t]));break;case-14:console.log("RCL no longer sufficient to use this spawn")}},StructureStorage.prototype.report=function(){this.store.energy>=50&&this.createTask("collect"),this.hits<this.hitsMax&&this.createTask("fix")},StructureStorage.prototype.debrief=function(){0===this.store.energy&&this.deleteTask("collect"),this.hits===this.hitsMax&&this.deleteTask("fix")},StructureTower.prototype.report=function(){this.store.energy>this.energyCapacity&&this.createTask("deposit"),this.hits<this.hitsMax&&this.createTask("fix")},StructureTower.prototype.debrief=function(){this.store.energy===this.energyCapacity&&this.deleteTask("deposit"),this.hits===this.hitsMax&&this.deleteTask("fix")},Creep.prototype.frog=function(){0===this.carry.energy?this.memory.state=0:this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.memory.state?this.construct():this.collect()},Creep.prototype.newt=function(){0===this.carry.energy?this.memory.state=0:this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.memory.state?this.deposit():this.collect()},Creep.prototype.toad=function(){return 0===this.carry.energy?this.memory.state=0:this.carry.energy>49&&(this.memory.state=1),this.memory.state?this.construct():this.mine()},Memory.recipes||(Memory.emoji={frog:"🐸",construct:"🛠️️",fix:"🏗️🏚️",mine:"💰",upgrade:"⚡",eat:"🍽️",deposit:"✨",collect:"✨",oops:"☠️",whack:"⚔️",pew:"🔫",aid:"💊",pickup:"✨",suicide:"💮",sogood:"✨🐸✨"},Memory.recipes={},Memory.recipes.frog={parts:{1:[MOVE,CARRY,MOVE,WORK],2:[MOVE,CARRY,MOVE,WORK],3:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],4:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],5:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],6:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],7:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],8:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK]},options:{role:"frog",resourceType:RESOURCE_ENERGY,jobs:{construct:null,collect:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}},Memory.recipes.newt={parts:{1:[MOVE,CARRY,MOVE,CARRY],2:[MOVE,CARRY,MOVE,CARRY],3:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],4:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],5:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],6:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],7:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],8:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]},options:{role:"newt",resourceType:RESOURCE_ENERGY,jobs:{deposit:null,collect:null,sweep:null,eat:null}}},Memory.recipes.toad={parts:{1:[MOVE,WORK,CARRY,WORK],2:[MOVE,WORK,CARRY,WORK],3:[MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],4:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],5:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],6:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],7:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY],8:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY]},options:{role:"toad",resourceType:RESOURCE_ENERGY,jobs:{construct:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}}),module.exports.loop=function(){for(var e in Game.structures){var t=Game.structures[e];switch(t.report(),t.structureType){case"spawn":t.memory.queen&&queen(t);break;case"tower":tower(t)}}for(var o in Game.constructionSites)Game.getObjectById(o).room.memory.jobs.construct.tasks.add(o);for(var s in Game.creeps){Game.creeps[s]||(Game.creeps[s].deleteWorkerAll(),delete Game.creeps[s]);var r=Game.creeps[s];switch(r.memory.room=r.room.name,r.memory.role){case"redspawn":redspawn(r);break;case"tadpole":tadpole(r);break;case"frog":r.say(r.frog());break;case"toad":r.say(r.toad());break;case"newt":r.say(r.newt());break;case"squatter":squatter(r);break;case"poliwog":poliwog(r)}}},Creep.prototype.aid=function(){switch(Game.getObjectById(this.memory.jobs.aid).debrief("aid"),this.heal(Game.getObjectById(this.memory.jobs.aid))){case 0:return Memory.emoji.aid;case-7:return Game.getObjectById(this.memory.jobs.aid).deleteTask("aid"),this.deleteAssignment("aid"),getTasksArray("aid").length?(this.assignTask("aid"),this.aid(),Memory.emoji.oops+Memory.emoji.aid+Memory.emoji.oops):(this.eat(),Memory.emoji.oops+Memory.emoji.aid+Memory.emoji.oops);case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.aid),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.aid;case-12:return this.deleteAssignment("aid"),this.deleteWorker("aid"),Memory.emoji.oops+Memory.emoji.aid+Memory.emoji.oops}},Creep.prototype.collect=function(){switch(Game.getObjectById(this.memory.jobs.collect).debrief(),this.withdraw(Game.getObjectById(this.memory.jobs.collect))){case 0:return Memory.emoji.collect;case-6:case-7:case-10:return this.deleteAssignment("collect"),getTasksArray("collect").length?(this.assignTask("collect"),this.collect(),Memory.emoji.oops+Memory.emoji.collect+Memory.emoji.oops):(_.includes(this.body,WORK)?this.mine():this.sweep(),Memory.emoji.oops+Memory.emoji.collect+Memory.emoji.oops);case-8:return this.memory.state=1,Memory.emoji.frog;case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.collect),{visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"dashed",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}},Creep.prototype.construct=function(){switch(this.memory.jobs.construct&&Game.getObjectById(this.memory.jobs.construct)||this.assignTask("construct"),Game.getObjectById(this.memory.jobs.construct).debrief(),this.build(Game.getObjectById(this.memory.jobs.construct))){case 0:return Memory.emoji.construct;case-6:return this.memory.state=0,Memory.emoji.frog;case-7:return Game.getObjectById(this.memory.jobs.construct).deleteTask("construct"),this.deleteAssignment("construct"),getTasksArray("construct").length?(this.assignTask("construct"),this.construct(),Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops):(this.upgrade(),Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops);case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.construct),{visualizePathStyle:{fill:"transparent",stroke:"#aacc66",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog;case-12:return console.log("bingbingbing"),this.deleteAssignment("construct"),this.deleteWorker("construct"),Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops;case-14:return Game.getObjectById(this.memory.jobs.construct).remove(),Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops}},Creep.prototype.deposit=function(){switch(Game.getObjectById(this.memory.jobs.deposit).debrief(),this.transfer(Game.getObjectById(this.memory.jobs.deposit))){case 0:return Memory.emoji.deposit;case-7:case-8:case-10:return this.deleteAssignment("deposit"),getTasksArray("deposit").length?(this.assignTask("deposit"),this.deposit(),Memory.emoji.oops+Memory.emoji.deposit+Memory.emoji.oops):(_.includes(this.body,WORK)?this.upgrade():this.eat(),Memory.emoji.oops+Memory.emoji.deposit+Memory.emoji.oops);case-6:return this.memory.state=0,Memory.emoji.frog;case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.deposit),{visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}},Creep.prototype.eat=function(){switch(this.transfer(Game.getObjectById(this.memory.eat),RESOURCE_ENERGY),Game.getObjectById(this.memory.eat).renewCreep(this)){case 0:return Memory.emoji.eat;case-6:case-7:case-8:return this.move(Math.floor(8*Math.random())),Memory.emoji.oops+Memory.emoji.eat+Memory.emoji.oops;case-9:return this.moveTo(Game.getObjectById(this.memory.eat),{visualizePathStyle:{fill:"transparent",stroke:"#00eeff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}},Creep.prototype.sacrifice=function(){return Game.getObjectById(this.memory.eat).recycleCreep(this)},Creep.prototype.fix=function(){switch(Game.getObjectById(this.memory.jobs.fix).debrief("fix"),this.repair(Game.getObjectById(this.memory.jobs.fix))){case 0:return Memory.emoji.fix;case-6:return this.memory.state=0,Memory.emoji.frog;case-7:return Game.getObjectById(this.memory.jobs.fix).deleteTask("fix"),(this.deleteAssignment("fix"),getTasksArray("fix").length)?(this.assignTask("fix"),this.fix(),Memory.emoji.oops+Memory.emoji.fix+Memory.emoji.oops):(this.memory.state=0,Memory.emoji.oops+Memory.emoji.fix+Memory.emoji.oops);case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.fix),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.fix;case-12:return this.deleteAssignment("fix"),this.deleteWorker("fix"),Memory.emoji.oops+Memory.emoji.fix+Memory.emoji.oops}},Creep.prototype.mine=function(){try{switch(this.harvest(Game.getObjectById(this.memory.jobs.mine))){case 0:return 0===this.upgradeController(this.room.controller)?Memory.emoji.sogood:Memory.emoji.mine;case-5:case-7:return this.assignTask("mine"),Memory.emoji.oops+Memory.emoji.mine+Memory.emoji.oops;case-6:return"toad"==this.memory.role?this.eat():"frog"==this.memory.role&&this.sweep(),Memory.emoji.oops+Memory.emoji.mine+Memory.emoji.oops;case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.mine),{visualizePathStyle:{reusePath:100,fill:"transparent",stroke:"#eeff99",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog;case-12:return this.deleteWorker("mine"),this.deleteAssignment("mine"),Memory.emoji.oops+Memory.emoji.mine+Memory.emoji.oops}}catch(e){console.log(e),this.assignTask("mine")}},Creep.prototype.sweep=function(){switch(Game.getObjectById(this.memory.jobs.sweep).debrief("sweep"),this.pickup(Game.getObjectById(this.memory.jobs.sweep))){case 0:return Memory.emoji.sweep;case-7:case-8:return this.deleteAssignment("sweep"),getTasksArray("sweep").length?(this.assignTask("sweep"),this.sweep(),Memory.emoji.oops+Memory.emoji.sweep+Memory.emoji.oops):(_.includes(this.body,WORK)?this.upgrade():this.eat(),Memory.emoji.oops+Memory.emoji.sweep+Memory.emoji.oops);case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.sweep),{visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}},Creep.prototype.upgrade=function(){switch(this.upgradeController(Game.getObjectById(this.memory.jobs.upgrade))){case 0:return Memory.emoji.upgrade;case-6:return this.memory.state=0,Memory.emoji.oops+Memory.emoji.upgrade+Memory.emoji.oops;case-7:return this.deleteAssignment("upgrade"),getTasksArray("upgrade").length&&(this.assignTask("upgrade"),this.upgrade()),Memory.emoji.oops+Memory.emoji.upgrade+Memory.emoji.oops;case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.build),{visualizePathStyle:{fill:"transparent",stroke:"#ffffff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}},Creep.prototype.whack=function(){switch(Game.getObjectById(this.memory.jobs.whack).debrief("whack"),this.attack(Game.getObjectById(this.memory.jobs.whack))){case 0:return Game.getObjectById(this.memory.jobs.whack).deleteTask("whack"),Memory.emoji.whack;case-7:return Game.getObjectById(this.memory.jobs.whack).deleteTask("whack"),this.deleteAssignment("whack"),getTasksArray("whack").length?(this.assignTask("whack"),this.whack(),Memory.emoji.oops+Memory.emoji.whack+Memory.emoji.oops):(this.eat(),Memory.emoji.oops+Memory.emoji.whack+Memory.emoji.oops);case-9:return this.moveTo(Game.getObjectById(this.memory.jobs.whack),{visualizePathStyle:{fill:"transparent",stroke:"#ff0000",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.whack;case-12:return this.deleteAssignment("whack"),this.deleteWorker("whack"),Memory.emoji.oops+Memory.emoji.whack+Memory.emoji.oops}};