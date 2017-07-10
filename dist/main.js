"use strict";function queen(e){var o=e.room,t=o.controller.level,r=Memory.recipes.frog,s=Memory.recipes.toad,i=Memory.recipes.newt,m=Math.max(Math.min(o.memory.jobs.collect.length,o.memory.jobs.deposit.length),o.memory.sc),a=Math.max(Math.min(o.memory.jobs.construct.length,o.memory.jobs.sweep.length),o.memory.sc),h=o.memory.sc,y=o.roleCount("toad"),n=o.roleCount("frog"),p=o.roleCount("newt");if(y<h){var R=e.spawnCreep(s,t+1);R||(R=e.spawnCreep(s,t))}else if(p<m){var c=e.spawnCreep(i,t+1);c||(c=e.spawnCreep(i,t)),c||(c=e.spawnCreep(i,1))}else if(n<a){var O=e.spawnCreep(r,t+1);O||(O=e.spawnCreep(r,t))}}function tower(e){var o=e.pos.findInRange(FIND_HOSTILE_CREEPS,5);e.room.memory.towers||(e.room.memory.towers={}),e.room.memory.towers[e.id]||(e.room.memory.towers[e.id]={}),e.room.memory.towers[e.id].mode||(e.room.memory.towers[e.id].mode="alert"),e.energy<=100||o.length>0?e.room.memory.towers[e.id].mode="alert":e.energy>100&&(e.room.memory.towers[e.id].mode="repair");var t,r=e.room.memory.towers[e.id].mode;if("alert"==r)t=e.room.find(FIND_MY_CREEPS,{filter:function(e){return e.hits<e.hitsMax}}),o.length>0?(o.length>1&&o.sort(function(e,o){return e.hits-o.hits}),e.attack(o[0])):t.length>0&&(t.length>1&&t.sort(function(e,o){return e.hits-o.hits}),e.heal(t[0]));else if("repair"==r){var s=e.room.memory.jobs.fix;e.repair(Game.getObjectById(s[0])),t=e.room.memory.jobs.aid,e.heal(Game.getObjectById(t[0]))}else o.length>0&&(o.length>1&&o.sort(function(e,o){return e.hits-o.hits}),e.attack(o[0]))}StructureContainer.prototype.report=function(){CM.set(this.pos.x,this.pos.y,0),this.store.energy>=50&&this.room.memory.jobs.collect.push(this.id),this.hits<1e4&&this.room.memory.jobs.fix.push(this.id)},StructureController.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.memory.jobs.upgrade.push(this.id)},Creep.prototype.report=function(e){this.room.memory.jobs[e].push(this.id)},StructureExtension.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.energy<this.energyCapacity&&this.room.memory.jobs.deposit.push(this.id),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)},Resource.prototype.report=function(){CM.set(this.pos.x,this.pos.y,0),this.room.memory.jobs.sweep.push(this.id)},StructureRoad.prototype.report=function(){this.hits<4e3&&this.room.memory.jobs.fix.push(this.id)},Room.prototype.initializeMemory=function(){this.memory.jobs={},this.memory.towers||(this.memory.towers={}),this.memory.sc||(this.memory.sc=this.find(FIND_SOURCES).length)},Room.prototype.queueTasks=function(){this.storage&&this.storage.report();var e=this.find(FIND_STRUCTURES);if(e.length)for(var o in e)try{e[o].report()}catch(t){console.log("No report method for "+e[o]+o.structureType)}var t=this.find(FIND_DROPPED_RESOURCES);if(t.length)for(var r in t){var s=t[r];this.memory.jobs.sweep.push(s.id)}for(var i in Game.constructionSites)this.memory.jobs.construct.push(i);var m=this.find(FIND_SOURCES_ACTIVE);if(m.length)for(var a in m){var h=m[a];this.memory.jobs.mine.push(h.id)}var y=this.find(FIND_MY_CREEPS);if(y.length)for(var n in y){var p=y[n];p.hits<p.hitsMax&&this.memory.jobs.aid.push(p.id),Memory.rooms[p.memory.room]&&(Memory.rooms[p.memory.room].roles[p.memory.role]?Memory.rooms[p.memory.room].roles[p.memory.role]+=1:Memory.rooms[p.memory.room].roles[p.memory.role]=1),"frog"==p.memory.role&&(p.carry.energy<p.carryCapacity&&this.memory.jobs.deposit.push(p.id),p.room.name!=p.memory.room&&"frog"==p.memory.role&&this.memory.roles.frog++)}},Room.prototype.releaseTask=function(e){return this.memory.jobs[e]||(this.memory.jobs[e]=[]),this.memory.jobs[e].length>0?this.memory.jobs[e].shift():null},Room.prototype.roleCount=function(e){return this.memory.roles[e]},Source.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.energy>0&&this.room.memory.jobs.mine.push(this.id)},StructureSpawn.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.memory.jobs.eat.push(this.id),this.energy<this.energyCapacity&&this.room.memory.jobs.deposit.push(this.id),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)},StructureSpawn.prototype.spawnCreep=function(e,o){switch(this.createCreep(e.parts[o],e.options.role+"_"+Game.time+"_"+this.room.name,e.options)){case-3:console.log("There is already a creep with this name");break;case-10:console.log("Body part array not properly formed: "),console.log(JSON.stringify(e.parts[o]));break;case-14:console.log("RCL no longer sufficient to use this spawn")}},StructureStorage.prototype.report=function(){EXTENSION_ENERGY_CAPACITY[this.room.controller.level]*CONTROLLER_STRUCTURES.extension[this.room.controller.level]<=this.room.energyAvailable&&this.store.energy<this.storeCapacity&&this.room.roleCount("frog")<=this.room.memory.jobs.deposit.length?this.room.memory.jobs.deposit.push(this.id):this.room.memory.jobs.collect.push(this.id),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)},StructureTower.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.energy<this.energyCapacity&&this.room.memory.jobs.deposit.push(this.id),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)},StructureWall.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.hits<1e3&&this.room.memory.jobs.fix.push(this.id)},Creep.prototype.frog=function(e,o){return 0===this.carry.energy&&(this.memory.state=0),this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.memory.state?(this.sweepAura(),this.collectAura(),this.requestTask("construct")?this.construct():this.requestTask("upgrade")?this.upgrade():this.requestTask("eat")?this.eat():"zzz"):this.requestTask("collect")?this.collect():this.requestTask("sweep")?this.sweep():this.requestTask("mine")?this.mine():"zzz"},Creep.prototype.newt=function(){if(0===this.carry.energy?this.memory.state=0:this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.sweepAura()||this.collectAura(),this.depositAura(),this.memory.state){if(this.requestTask("deposit"))return this.deposit();if(this.requestTask("eat"))return this.eat()}else{if(this.requestTask("sweep"))return this.sweep();if(this.requestTask("collect"))return this.collect();if(this.requestTask("eat"))return this.eat()}return"zzz"},Creep.prototype.toad=function(){this.carry.energy<this.carryCapacity&&(this.memory.state=0),this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.depositAura(),this.sweepAura(),this.eatAura(),this.fixAura();var e=EXTENSION_ENERGY_CAPACITY[this.room.controller.level]*CONTROLLER_STRUCTURES.extension[this.room.controller.level]<=this.room.energyAvailable;return this.ticksToLive<200&&e&&(this.memory.hungry=!0),this.ticksToLive>1400&&(this.memory.hungry=!1),this.memory.hungry?(this.requestTask("mine"),this.requestTask("eat")?this.eat():void 0):(e&&this.upgradeAura()&&this.carry<this.carryCapacity&&this.room.memory.jobs.deposit.push(this.id),this.requestTask("mine")?this.mine():this.requestTask("construct")?this.construct():Memory.emoji.frog)},Creep.prototype.aid=function(){if(this.memory.jobs.aid)switch(this.heal(Game.getObjectById(this.memory.jobs.aid))){case 0:return Memory.emoji.aid;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.aid),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.aid+Memory.emoji.oops},Creep.prototype.collect=function(){if(this.memory.jobs.collect)switch(this.withdraw(Game.getObjectById(this.memory.jobs.collect),RESOURCE_ENERGY)){case 0:return Memory.emoji.collect;case-9:return this.collectAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.collect),{visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"dashed",strokeWidth:.15,opacity:.1},costCallback:CM}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.collect+Memory.emoji.oops},Creep.prototype.construct=function(){if(this.memory.jobs.construct)switch(this.build(Game.getObjectById(this.memory.jobs.construct))){case 0:return Memory.emoji.construct;case-9:return this.constructAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.construct),{visualizePathStyle:{fill:"transparent",stroke:"#aacc66",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops},Creep.prototype.requestTask=function(e){if(this.memory.jobs||(this.memory.jobs={}),this.memory.jobs[e]=Game.rooms[this.memory.room].releaseTask(e),this.memory.jobs[e]){Game.getObjectById(this.memory.jobs[e]).pos;return!!this.memory.jobs[e]&&(this.room.memory.jobs[e].push(this.memory.jobs[e]),!0)}return this.memory.jobs={},!1},Creep.prototype.aidAura=function(){for(var e in this.room.memory.jobs.aid){if(0===this.heal(Game.getObjectById(this.room.memory.jobs.aid[e]),RESOURCE_ENERGY))return!0;if(0===this.rangedHeal(Game.getObjectById(this.room.memory.jobs.aid[e]),RESOURCE_ENERGY))return!0}return!1},Creep.prototype.collectAura=function(){for(var e in this.room.memory.jobs.collect){if(0===this.withdraw(Game.getObjectById(this.room.memory.jobs.collect[e]),RESOURCE_ENERGY))return!0;for(var o in this.carry)"energy"!==o.resourceType&&0!==this.transfer(Game.getObjectById(this.room.storage),o.resourceType)&&this.transfer(Game.getObjectById(this.room.terminal),o.resourceType)}return!1},Creep.prototype.constructAura=function(){for(var e in this.room.memory.jobs.construct)if(0===this.build(this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES),RESOURCE_ENERGY))return!0;return!1},Creep.prototype.depositAura=function(){for(var e in this.room.memory.jobs.deposit)if(Game.getObjectById(this.room.memory.jobs.deposit[e])&&0===this.transfer(Game.getObjectById(this.room.memory.jobs.deposit[e]),RESOURCE_ENERGY))return!0;if("toad"==this.memory.role){if(0===this.transfer(this.room.storage,RESOURCE_ENERGY))return!0;if(0===this.transfer(this.room.terminal,RESOURCE_ENERGY))return!0}return!1},Creep.prototype.eatAura=function(){for(var e in this.room.memory.jobs.eat)if(0===Game.getObjectById(this.room.memory.jobs.eat[e]).renewCreep(this))return!0;return!1},Creep.prototype.fixAura=function(){for(var e in this.room.memory.jobs.fix)if(0===this.repair(Game.getObjectById(this.room.memory.jobs.fix[e])))return!0;return!1},Creep.prototype.mineAura=function(){for(var e in this.room.memory.jobs.mine)if(0===this.harvest(Game.getObjectById(this.room.memory.jobs.mine[e])))return!0;return!1},Creep.prototype.sweepAura=function(){for(var e in this.room.memory.jobs.sweep)if(0===this.pickup(Game.getObjectById(this.room.memory.jobs.sweep[e])))return!0;return!1},Creep.prototype.upgradeAura=function(){for(var e in this.room.memory.jobs.upgrade)if(Game.getObjectById(this.room.memory.jobs.upgrade[e])&&(this.signController(Game.getObjectById(this.room.memory.jobs.upgrade[e]),"Ribbit"),0===this.upgradeController(Game.getObjectById(this.room.memory.jobs.upgrade[e]),RESOURCE_ENERGY)))return!0;return!1},Creep.prototype.whackAura=function(){for(var e in this.room.memory.jobs.whack)if(Game.getObjectById(this.room.memory.jobs.whack[e])){if(0===this.attack(Game.getObjectById(this.room.memory.jobs.whack[e])))return!0;if(0===this.rangedAttack(Game.getObjectById(this.room.memory.jobs.whack[e])))return!0}return!1},Creep.prototype.deposit=function(){if(this.memory.jobs.deposit)switch(this.transfer(Game.getObjectById(this.memory.jobs.deposit),RESOURCE_ENERGY)){case 0:return Memory.emoji.deposit;case-9:return this.depositAura(),CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.deposit),{visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1}}),Memory.emoji.frog}return Memory.emoji.oops+Memory.emoji.deposit+Memory.emoji.oops},Creep.prototype.eat=function(){if(this.memory.jobs.eat)switch(Game.getObjectById(this.memory.jobs.eat).renewCreep(this)){case 0:return Memory.emoji.eat;case-9:return this.eatAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.eat),{visualizePathStyle:{fill:"transparent",stroke:"#00eeff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.eat+Memory.emoji.oops},Creep.prototype.fix=function(){if(this.memory.jobs.fix)switch(this.repair(Game.getObjectById(this.memory.jobs.fix))){case 0:return Memory.emoji.fix;case-9:return this.fixAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.fix),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.fix)}return Memory.emoji.oops+Memory.emoji.fix+Memory.emoji.oops},Creep.prototype.mine=function(){if(this.memory.jobs.mine)switch(this.harvest(Game.getObjectById(this.memory.jobs.mine))){case 0:return Memory.emoji.mine;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.mine),{visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.mine+Memory.emoji.oops},Creep.prototype.sweep=function(){if("energy"==Game.getObjectById(this.memory.jobs.sweep).resourceType)switch(this.pickup(Game.getObjectById(this.memory.jobs.sweep))){case 0:return Memory.emoji.sweep;case-9:return this.sweepAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.sweep),{visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.sweep+Memory.emoji.oops},Creep.prototype.upgrade=function(){if(this.memory.jobs.upgrade)switch(this.signController("Ribbit"),this.upgradeController(Game.getObjectById(this.memory.jobs.upgrade))){case 0:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.upgrade),{visualizePathStyle:{fill:"transparent",stroke:"#ffffff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.upgrade;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.upgrade),{visualizePathStyle:{fill:"transparent",stroke:"#ffffff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.upgrade+Memory.emoji.oops},Creep.prototype.whack=function(){if(this.memory.jobs.whack)switch(this.attack(Game.getObjectById(this.memory.jobs.whack))){case 0:return Game.getObjectById(this.memory.jobs.whack).deleteTask("whack"),Memory.emoji.whack;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.whack),{visualizePathStyle:{fill:"transparent",stroke:"#ff0000",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.whack}return Memory.emoji.oops+Memory.emoji.whack+Memory.emoji.oops},Memory.recipes||(Memory.recipes={},Memory.recipes.frog={parts:{1:[MOVE,CARRY,MOVE,WORK],2:[MOVE,CARRY,MOVE,WORK],3:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],4:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],5:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],6:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],7:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],8:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK]},options:{role:"frog",resourceType:RESOURCE_ENERGY,jobs:{construct:null,collect:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}},Memory.recipes.newt={parts:{1:[MOVE,CARRY,MOVE,CARRY],2:[MOVE,CARRY,MOVE,CARRY],3:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],4:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],5:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],6:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],7:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],8:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]},options:{role:"newt",resourceType:RESOURCE_ENERGY,jobs:{deposit:null,collect:null,sweep:null,eat:null}}},Memory.recipes.toad={parts:{1:[MOVE,WORK,CARRY,WORK],2:[MOVE,WORK,CARRY,WORK],3:[MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],4:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],5:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],6:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY],7:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY],8:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY]},options:{role:"toad",resourceType:RESOURCE_ENERGY,builtcontainer:0,jobs:{construct:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}}),Memory.emoji={frog:"🐸",construct:"🛠️️",fix:"🏚️",mine:"💰",upgrade:"⚡",eat:"🍽️",deposit:"✨",collect:"✨",oops:"☠️",whack:"⚔️",pew:"🔫",aid:"💊",sweep:"✨",suicide:"💮",sogood:"✨🐸✨",hop:"💨"},Memory.costMatrix=new PathFinder.CostMatrix;var CM=Memory.costMatrix;module.exports.loop=function(){for(var e in Memory.rooms){var o=Game.rooms[e];o&&(o.initializeMemory(),o.memory.roles={frog:0,newt:0,toad:0,squatter:0},o.memory.jobs={whack:[],construct:[],deposit:[],collect:[],aid:[],fix:[],sweep:[],mine:[],eat:[],upgrade:[]},o.queueTasks())}for(var t in Game.structures){var r=Game.structures[t];switch(r.structureType){case"tower":tower(r);break;case"spawn":Memory.spawns[r.name].queen&&queen(r)}}for(var s in Memory.creeps)if(Game.creeps[s]){if(Game.creeps[s]){var i=Game.creeps[s];switch(i.memory.room=i.name.split("_")[2],i.memory.role){case"frog":i.say(i.frog());break;case"toad":i.say(i.toad());break;case"newt":i.say(i.newt())}}}else delete Memory.creeps[s]};