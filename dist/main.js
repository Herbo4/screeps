"use strict";function _toConsumableArray(o){if(Array.isArray(o)){for(var e=0,t=Array(o.length);e<o.length;e++)t[e]=o[e];return t}return Array.from(o)}function queen(o){var e=o.room,t=e.controller.level,r=Memory.recipes.frog,s=Memory.recipes.toad,i=Memory.recipes.newt,m=Memory.recipes.minnow,h=e.memory.sc,a=e.memory.jobs.construct.length,n=e.memory.sc,y=e.storage&&Game.flags.minnow?2:0,c=e.roleCount("toad"),p=e.roleCount("frog");console.log(o.room.name+" frogs: "+p+" frogcap: "+a);var R=e.roleCount("newt"),u=e.roleCount("minnow");if(c<n){var l=o.spawnCreep(s,t+1);l||(l=o.spawnCreep(s,t))}else if(R<h){var O=o.spawnCreep(i,t+1);O||(O=o.spawnCreep(i,t)),O||(O=o.spawnCreep(i,t-1))}else if(p<a){var M=o.spawnCreep(r,t+1);M||(M=o.spawnCreep(r,t))}else if(u<y){o.spawnCreep(m,t)}}function tower(o){var e=o.pos.findInRange(FIND_HOSTILE_CREEPS,15);o.room.memory.towers||(o.room.memory.towers={}),o.room.memory.towers[o.id]||(o.room.memory.towers[o.id]={}),o.room.memory.towers[o.id].mode||(o.room.memory.towers[o.id].mode="alert"),o.energy<=100||e.length>0?o.room.memory.towers[o.id].mode="alert":o.energy>100&&(o.room.memory.towers[o.id].mode="repair");var t,r=o.room.memory.towers[o.id].mode;if("alert"==r)t=o.room.find(FIND_MY_CREEPS,{filter:function(o){return o.hits<o.hitsMax}}),e.length>0?(e.length>1&&e.sort(function(o,e){return o.hits-e.hits}),o.attack(e[0])):t.length>0&&(t.length>1&&t.sort(function(o,e){return o.hits-e.hits}),o.heal(t[0]));else if("repair"==r){var s=o.room.memory.jobs.fix;o.repair(Game.getObjectById(s[0])),t=o.room.memory.jobs.aid,o.heal(Game.getObjectById(t[0]))}else e.length>0&&(e.length>1&&e.sort(function(o,e){return o.hits-e.hits}),o.attack(e[0]))}StructureContainer.prototype.report=function(){CM.set(this.pos.x,this.pos.y,0),_.sum(this.store)>=50&&this.room.memory.jobs.collect.push(this.id),this.hits<1e4&&this.room.memory.jobs.fix.push(this.id)},StructureController.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.memory.jobs.upgrade.push(this.id)},Creep.prototype.report=function(o){this.room.memory.jobs[o].push(this.id)},StructureExtension.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.controller.my?(this.energy<this.energyCapacity&&Memory.rooms[this.room.name].jobs.deposit.push(this.id),this.hits<this.hitsMax&&Memory.rooms[this.room.name].memory.jobs.fix.push(this.id)):this.energy>0?(Memory.rooms[this.room.name].jobs.collect.push(this.id),this.room.memory.parentRoom&&Memory.rooms[this.room.memory.parentRoom].jobs.collect.push(this.id)):(Memory.rooms[this.room.name].jobs.deconstruct.push(this.id),this.room.memory.parentRoom&&Memory.rooms[this.room.memory.parentRoom].jobs.deconstruct.push(this.id))},StructureLab.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.controller.my?(this.energy<this.energyCapacity&&Memory.rooms[this.room.name].jobs.deposit.push(this.id),this.hits<this.hitsMax&&Memory.rooms[this.room.name].memory.jobs.fix.push(this.id)):this.energy>0?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructurePowerSpawn.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.controller.my?(this.energy<this.energyCapacity&&Memory.rooms[this.room.name].jobs.deposit.push(this.id),this.hits<this.hitsMax&&Memory.rooms[this.room.name].memory.jobs.fix.push(this.id)):this?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructureRampart.prototype.report=function(){if(this.room.controller.my){if(this.hits<15e4*this.room.controller.level&&this.room.memory.jobs.fix.push(this.id),[].concat(_toConsumableArray(this.room.lookAt(this.pos.x,this.pos.y))).length>2?this.setPublic(!1):this.setPublic(!0),this.room.memory.jobs.whack.length>0)for(var o in this.room.memory.jobs.whack){var e=Game.getObjectById(this.room.memory.jobs.whack[o]);this.pos.inRangeTo(e,1)&&this.setPublic(!1)}}else Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},Resource.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),"energy"==this.resourceType&&this.room.memory.jobs.sweep.push(this.id)},StructureRoad.prototype.report=function(){this.hits<4e3&&this.room.memory.jobs.fix.push(this.id)},Room.prototype.initializeMemory=function(){this.memory.jobs={},this.memory.towers||(this.memory.towers={}),this.memory.sc||(this.memory.sc=this.find(FIND_SOURCES).length),this.memory.storage||this.storage&&(this.memory.storage={id:this.storage.id,pos:this.storage.pos}),this.memory.terminal||this.terminal&&(this.memory.terminal={id:this.terminal.id,pos:this.terminal.pos}),this.memory.controller||this.controller&&(this.memory.controller={id:this.controller.id,pos:this.controller.pos})},Room.prototype.queueTasks=function(o){var e=this.find(FIND_HOSTILE_CREEPS);if(e.length)for(var t in e){var r=e[t];r.hits>0&&(this.memory.jobs.whack.push(r.id),o&&o.memory.jobs.whack.push(r.id))}var s=this.find(FIND_DROPPED_RESOURCES);if(s.length)for(var i in s){var m=s[i];this.memory.jobs.sweep.push(m.id),o&&o.memory.jobs.sweep.push(m.id)}var h=this.find(FIND_SOURCES);if(h.length)for(var a in h){var n=h[a];this.memory.jobs.mine.push(n.id),o&&o.memory.jobs.mine.push(n.id)}for(var y in Game.constructionSites)Game.getObjectById(y).room&&Game.getObjectById(y).room.name==this.name&&(this.memory.jobs.construct.push(y),CM.set(Game.getObjectById(y).pos.x,Game.getObjectById(y).pos.y,0),o&&o.memory.jobs.construct.push(y));var c=this.find(FIND_STRUCTURES);if(c.length)for(var p in c)try{"storage"!=c[p].structureType&&c[p].report()}catch(t){}this.storage&&this.storage.report();var R=this.find(FIND_MY_CREEPS);if(R.length)for(var u in R){var l=R[u];l.hits<l.hitsMax&&(this.memory.jobs.aid.push(l.id),o&&o.memory.jobs.aid.push(l.id)),Memory.rooms[l.memory.room]&&(Memory.rooms[l.memory.room].roles[l.memory.role]?Memory.rooms[l.memory.room].roles[l.memory.role]+=1:Memory.rooms[l.memory.room].roles[l.memory.role]=1),"frog"==l.memory.role&&(l.carry.energy<l.carryCapacity&&(this.memory.jobs.deposit.push(l.id),o&&o.memory.jobs.deposit.push(l.id)),l.room.name!=l.memory.room&&"frog"==l.memory.role&&this.memory.roles.frog++)}},Room.prototype.releaseTask=function(o){return this.memory.jobs[o]||(this.memory.jobs[o]=[]),this.memory.jobs[o].length>0?this.memory.jobs[o].shift():null},Room.prototype.roleCount=function(o){return Memory.rooms[this.name].roles[o]||(Memory.rooms[this.name].roles[o]=0),console.log(o+" "+this.name+" "+Memory.rooms[this.name].roles[o]),Memory.rooms[this.name].roles[o]},Source.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.memory.jobs.mine.push(this.id)},StructureSpawn.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.controller.my?(this.room.memory.jobs.eat.push(this.id),this.energy<this.energyCapacity&&this.room.memory.jobs.deposit.push(this.id),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)):this.energy>0?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructureSpawn.prototype.spawnCreep=function(o,e){switch(o.options.room=this.room.name,this.createCreep(o.parts[e],o.options.role+"_"+Game.time+"_"+this.room.name,o.options)){case-10:console.log("Body part array not properly formed: "),console.log(JSON.stringify(o.parts[e]));break;case-14:console.log("RCL no longer sufficient to use this spawn")}},StructureStorage.prototype.report=function(){this.room.controller.my?(this.store.energy>0&&(this.room.memory.jobs.collect.push(this.id),this.room.memory.childRoom&&Memory.rooms[this.room.memory.childRoom].jobs.collect.push(this.id)),this.hits<this.hitsMax&&this.room.memory.jobs.fix.push(this.id)):this.store.energy>0?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructureTerminal.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.room.controller.my?(this.store.energy>4e3?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deposit.push(this.id),this.hits<this.hitsMax&&Memory.rooms[this.room.name].memory.jobs.fix.push(this.id)):_.sum(this.store)>0?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructureTower.prototype.report=function(){this.room.controller.my?(this.energy<this.energyCapacity&&Memory.rooms[this.room.name].jobs.deposit.push(this.id),this.hits<this.hitsMax&&Memory.rooms[this.room.name].memory.jobs.fix.push(this.id)):this.energy>0?Memory.rooms[this.room.name].jobs.collect.push(this.id):Memory.rooms[this.room.name].jobs.deconstruct.push(this.id)},StructureWall.prototype.report=function(){CM.set(this.pos.x,this.pos.y,255),this.hits<100&&this.room.memory.jobs.fix.push(this.id)},Creep.prototype.aid=function(){if(this.memory.jobs.aid)switch(this.heal(Game.getObjectById(this.memory.jobs.aid))){case 0:return Memory.emoji.aid;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.aid),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.aid+Memory.emoji.oops},Creep.prototype.collect=function(){if(this.memory.jobs.collect)switch(this.withdraw(Game.getObjectById(this.memory.jobs.collect),RESOURCE_ENERGY)){case 0:return Memory.emoji.collect;case-9:return this.collectAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.collect),{reusePath:10,visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"dashed",strokeWidth:.15,opacity:.1},costCallback:CM}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.collect+Memory.emoji.oops},Creep.prototype.construct=function(){if(this.memory.jobs.construct)switch(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.construct),{visualizePathStyle:{fill:"transparent",stroke:"#aacc66",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),this.build(Game.getObjectById(this.memory.jobs.construct))){case 0:return Memory.emoji.construct;case-9:return this.constructAura()?Memory.emoji.sogood:Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.construct+Memory.emoji.oops},Creep.prototype.requestTask=function(o){return this.memory.jobs||(this.memory.jobs={}),this.memory.jobs[o]=Game.rooms[this.memory.room].releaseTask(o),this.memory.jobs[o]?(this.room.memory.jobs[o].push(this.memory.jobs[o]),!0):(this.memory.jobs={},!1)},Creep.prototype.aidAura=function(){for(var o in this.room.memory.jobs.aid){if(0===this.heal(Game.getObjectById(this.room.memory.jobs.aid[o]),RESOURCE_ENERGY))return!0;if(0===this.rangedHeal(Game.getObjectById(this.room.memory.jobs.aid[o]),RESOURCE_ENERGY))return!0}return!1},Creep.prototype.collectAura=function(){for(var o in Memory.rooms[this.room.name].jobs.collect)if(0===this.withdraw(Game.getObjectById(Memory.rooms[this.room.name].jobs.collect[o]),RESOURCE_ENERGY))return!0;return!1},Creep.prototype.constructAura=function(){for(var o in this.room.memory.jobs.construct)if(0===this.build(this.pos.findClosestByRange(FIND_CONSTRUCTION_SITES),RESOURCE_ENERGY))return!0;return!1},Creep.prototype.deconstructAura=function(){for(var o in this.room.memory.jobs.deconstruct)if(0===this.dismantle(this.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES)))return!0;return!1},Creep.prototype.depositAura=function(){for(var o in this.room.memory.jobs.deposit)if(Game.getObjectById(this.room.memory.jobs.deposit[o])&&0===this.transfer(Game.getObjectById(this.room.memory.jobs.deposit[o]),RESOURCE_ENERGY))for(var e in this.carry)return this.transfer(Game.getObjectById(this.memory.jobs.deposit),e),!0;if("toad"==this.memory.role){if(0===this.transfer(this.room.storage,RESOURCE_ENERGY))return!0;if(0===this.transfer(this.room.terminal,RESOURCE_ENERGY))return!0}return!1},Creep.prototype.dumpAura=function(){for(var o in this.room.memory.jobs.deposit)if(Game.getObjectById(this.room.memory.jobs.deposit[o]))for(var e in this.carry){if(0===this.transfer(this.room.terminal,e))return!0;if(0===this.transfer(this.room.storage,e))return!0;if(0===this.transfer(Game.getObjectById(this.memory.jobs.deposit),e))return!0}return"toad"==this.memory.role&&0===this.transfer(this.room.storage,RESOURCE_ENERGY)},Creep.prototype.eatAura=function(){for(var o in this.room.memory.jobs.eat)if(0===Game.getObjectById(this.room.memory.jobs.eat[o]).renewCreep(this))return this.depositAura(),!0;return!1},Creep.prototype.fixAura=function(){for(var o in this.room.memory.jobs.fix)if(0===this.repair(Game.getObjectById(this.room.memory.jobs.fix[o])))return!0;return!1},Creep.prototype.mineAura=function(){for(var o in this.room.memory.jobs.mine)if(0===this.harvest(Game.getObjectById(this.room.memory.jobs.mine[o])))return!0;return!1},Creep.prototype.sweepAura=function(){for(var o in this.room.memory.jobs.sweep)if(0===this.pickup(Game.getObjectById(this.room.memory.jobs.sweep[o])))return!0;return!1},Creep.prototype.upgradeAura=function(){for(var o in this.room.memory.jobs.upgrade)if(Game.getObjectById(this.room.memory.jobs.upgrade[o])&&(this.signController(Game.getObjectById(this.room.memory.jobs.upgrade[o]),"Ribbit"),0===this.upgradeController(Game.getObjectById(this.room.memory.jobs.upgrade[o]),RESOURCE_ENERGY)))return!0;return!1},Creep.prototype.vacuumAura=function(){for(var o in this.room.memory.jobs.collect)if(this.room.memory.jobs.collect[o].store)for(var e in Game.getObjectById(this.room.memory.jobs.collect[o]).store)return this.withdraw(Game.getObjectById(this.room.memory.jobs.collect[o]),e);else this.withdraw(Game.getObjectById(this.room.memory.jobs.collect[o]),RESOURCE_ENERGY),this.withdraw(Game.getObjectById(this.room.memory.jobs.collect[o]),RESOURCE_POWER),this.withdraw(Game.getObjectById(this.room.memory.jobs.collect[o]),RESOURCE_GHODIUM);for(var t in this.room.memory.jobs.sweep)this.pickup(Game.getObjectById(this.room.memory.jobs.sweep[t]))},Creep.prototype.whackAura=function(){for(var o in this.room.memory.jobs.whack)if(Game.getObjectById(this.room.memory.jobs.whack[o])){if(0===this.attack(Game.getObjectById(this.room.memory.jobs.whack[o])))return!0;if(0===this.rangedAttack(Game.getObjectById(this.room.memory.jobs.whack[o])))return!0}return!1},Creep.prototype.deconstruct=function(){if(this.memory.jobs.deconstruct)switch(this.dismantle(Game.getObjectById(this.memory.jobs.deconstruct))){case 0:return Memory.emoji.deconstruct;case-9:return this.deconstructAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.deconstruct),{visualizePathStyle:{fill:"transparent",stroke:"#ff0000",lineStyle:"solid",strokeWidth:.15,opacity:.4}}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.deconstruct+Memory.emoji.oops},Creep.prototype.deposit=function(){if(this.memory.jobs.deposit)switch(this.transfer(Game.getObjectById(this.memory.jobs.deposit),RESOURCE_ENERGY)){case 0:return Memory.emoji.deposit;case-9:return this.depositAura(),CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.deposit),{reusePath:5,visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1},costCallback:CM}),Memory.emoji.frog}return this.moveTo(this.room.storage,{reusePath:5,ignoreCreeps:!1,visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1},costCallback:CM}),Memory.emoji.sogood},Creep.prototype.eat=function(){if(this.ticksToLive<420?this.memory.hungry=!0:this.memory.hungry=!1,this.memory.jobs.eat)return 0===Game.getObjectById(this.memory.jobs.eat).renewCreep(this)?(this.depositAura(),Memory.emoji.eat):this.memory.hungry?(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.eat),{visualizePathStyle:{fill:"transparent",stroke:"#00eeff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop):"toad"==this.memory.role?(this.moveTo(Game.getObjectById(this.memory.jobs.mine),{visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop):(this.moveTo(Game.rooms[this.memory.room].storage),Memory.emoji.hop)},Creep.prototype.fix=function(){if(this.memory.jobs.fix)switch(this.repair(Game.getObjectById(this.memory.jobs.fix))){case 0:return Memory.emoji.fix;case-9:return this.fixAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.fix),{visualizePathStyle:{fill:"transparent",stroke:"#ffaaaa",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.fix)}return Memory.emoji.oops+Memory.emoji.fix+Memory.emoji.oops},Creep.prototype.mine=function(){if(this.memory.jobs.mine)switch(this.harvest(Game.getObjectById(this.memory.jobs.mine))){case 0:var o=this.pos.look(),e=0;return o.forEach(function(o){o.type==LOOK_RESOURCES&&(e+=1)}),e>0&&this.moveTo(Game.getObjectById(this.memory.jobs.mine)),Memory.emoji.mine;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.mine),{reusePath:20,visualizePathStyle:{fill:"transparent",stroke:"#eeff99",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop;case-6:return this.requestTask("eat")?this.eat():"zzz"}return this.harvest(Game.getObjectById(this.memory.jobs.mine))},Creep.prototype.sweep=function(){if("energy"==Game.getObjectById(this.memory.jobs.sweep).resourceType)switch(this.pickup(Game.getObjectById(this.memory.jobs.sweep))){case 0:return Memory.emoji.sweep;case-9:return this.sweepAura()?Memory.emoji.sogood:(CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.sweep),{reusePath:10,visualizePathStyle:{fill:"transparent",stroke:"#eecc00",lineStyle:"dashed",strokeWidth:.15,opacity:.1},costCallback:CM}),Memory.emoji.hop)}return Memory.emoji.oops+Memory.emoji.sweep+Memory.emoji.oops},Creep.prototype.upgrade=function(){if(this.memory.jobs.upgrade)switch(this.signController("Ribbit"),this.upgradeController(Game.getObjectById(this.memory.jobs.upgrade))){case 0:return CM.set(this.pos.x,this.pos.y,255),this.move(7*Math.random()+1),Memory.emoji.upgrade;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.upgrade),{visualizePathStyle:{fill:"transparent",stroke:"#ffffff",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.hop}return Memory.emoji.oops+Memory.emoji.upgrade+Memory.emoji.oops},Creep.prototype.whack=function(){if(this.memory.jobs.whack)switch(this.attack(Game.getObjectById(this.memory.jobs.whack))){case 0:return Game.getObjectById(this.memory.jobs.whack).deleteTask("whack"),Memory.emoji.whack;case-9:return CM.set(this.pos.x,this.pos.y,0),this.moveTo(Game.getObjectById(this.memory.jobs.whack),{visualizePathStyle:{fill:"transparent",stroke:"#ff0000",lineStyle:"solid",strokeWidth:.15,opacity:.1}}),Memory.emoji.whack}return Memory.emoji.oops+Memory.emoji.whack+Memory.emoji.oops},Creep.prototype.frog=function(){return 0===_.sum(this.carry)&&(this.memory.state=0),_.sum(this.carry)===this.carryCapacity&&(this.memory.state=1),this.memory.state?(this.sweepAura(),this.collectAura(),this.requestTask("construct")?this.construct():this.requestTask("upgrade")?(this.mineAura(),this.upgrade()):this.requestTask("eat")?this.eat():"zzz"):this.requestTask("sweep")?this.sweep():this.requestTask("collect")?this.collect():this.requestTask("deconstruct")?this.deconstruct():this.requestTask("mine")?this.mine():"zzz"},Creep.prototype.minnow=function(){if(0===_.sum(this.carry)&&(this.memory.state=0),_.sum(this.carry)>this.carryCapacity/2&&(this.memory.state=1),this.room.controller&&this.room.controller.my?(this.sweepAura(),this.dumpAura()):this.vacuumAura(),this.memory.hungry&&this.requestTask("eat"))return this.moveTo(Game.getObjectById(this.memory.jobs.eat)),this.eatAura(),Memory.emoji.hop;if(this.memory.state){if(this.memory.checkpoint=0,Game.cpu.tickLimit-Game.cpu.getUsed()>20?this.moveTo(Game.rooms[this.memory.room].storage):this.moveTo(Game.rooms[this.memory.room].storage,{noPathFinding:!0}),this.room.terminal)for(var o in this.carry)this.transfer(Game.rooms[this.memory.room].terminal,o);if(this.room.storage)for(var e in this.carry)this.transfer(Game.rooms[this.memory.room].storage,e);return Memory.emoji.hop}if(this.pos.isEqualTo(Game.flags.minnow.pos)&&(this.memory.checkpoint=1),this.memory.checkpoint>0){if(!this.room.controller||!this.room.controller.my){if(this.room.storage){Game.cpu.tickLimit-Game.cpu.getUsed()>20?this.moveTo(this.room.storage):this.moveTo(this.room.storage,{noPathFinding:!0});for(var t in this.room.storage.store)this.withdraw(this.room.storage,t)}if(this.room.terminal){Game.cpu.tickLimit-Game.cpu.getUsed()>20?this.moveTo(this.room.terminal):this.moveTo(this.room.terminal,{noPathFinding:!0});for(var r in this.room.terminal.store)this.withdraw(this.room.terminal,r)}}}else Game.cpu.tickLimit-Game.cpu.getUsed()>20&&this.moveTo(Game.flags.minnow),this.moveTo(Game.flags.minnow,{noPathFinding:!0});return Memory.emoji.hop},Creep.prototype.newt=function(){if(0===_.sum(this.carry)?this.memory.state=0:_.sum(this.carry)>0&&(this.memory.state=1),this.memory.from||this.sweepAura()||this.collectAura(),this.memory.to||this.depositAura(),this.memory.state)if(this.memory.to){for(var o in this.carry)if(0==this.transfer(Game.getObjectById(this.memory.to),o))return"bibiibiii!";if(0===this.moveTo(Game.getObjectById(this.memory.to)))return"ribit"}else{if(this.requestTask("deposit"))return this.deposit();if(this.requestTask("eat"))return this.eat()}else if(this.memory.from){if(Game.getObjectById(this.memory.from).store){for(var e in RESOURCES_ALL)if(0===this.withdraw(Game.getObjectById(this.memory.from),RESOURCES_ALL[e]))return"bibiibiii!"}else if(Game.getObjectById(this.memory.from).carry)for(var t in Game.getObjectById(this.memory.from).carry){if(0===Game.getObjectById(this.memory.from).transfer(this,t))return"bibiibiii!";if(0===this.moveTo(Game.getObjectById(this.memory.from)))return"ribit"}if(0===this.moveTo(Game.getObjectById(this.memory.from)))return"ribit"}else{if(this.requestTask("collect"))return this.collect();if(this.requestTask("sweep"))return this.sweep();if(this.requestTask("eat"))return this.eat()}return"zzz"},Creep.prototype.toad=function(){this.carry.energy<this.carryCapacity&&(this.memory.state=0),this.carry.energy===this.carryCapacity&&(this.memory.state=1),this.depositAura()||(this.dumpAura(),this.constructAura()),this.sweepAura(),this.eatAura(),this.mineAura();var o=EXTENSION_ENERGY_CAPACITY[this.room.controller.level]*CONTROLLER_STRUCTURES.extension[this.room.controller.level]<=this.room.energyAvailable;return this.memory.hungry?this.requestTask("eat")?(this.requestTask("mine"),this.eat()):void 0:(o&&(this.constructAura()||this.upgradeAura()),this.requestTask("mine")?this.mine():this.requestTask("eat")?this.eat():Memory.emoji.frog)},Memory.recipes||(Memory.recipes={},Memory.recipes.frog={parts:{1:[MOVE,CARRY,MOVE,WORK],2:[MOVE,CARRY,MOVE,WORK],3:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],4:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],5:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],6:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],7:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK],8:[MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK,MOVE,CARRY,MOVE,WORK]},options:{role:"frog",resourceType:RESOURCE_ENERGY,jobs:{construct:null,collect:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}},Memory.recipes.newt={parts:{1:[MOVE,CARRY,MOVE,CARRY],2:[MOVE,CARRY,MOVE,CARRY],3:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],4:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],5:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],6:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],7:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],8:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY]},options:{role:"newt",resourceType:RESOURCE_ENERGY,jobs:{deposit:null,collect:null,sweep:null,eat:null}}},Memory.recipes.minnow={parts:{1:[MOVE,CARRY,MOVE,CARRY],2:[MOVE,CARRY,MOVE,CARRY],3:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],4:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],5:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],6:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],7:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY],8:[MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY]},options:{role:"minnow",jobs:{eat:null},to:null,from:null}},Memory.recipes.toad={parts:{1:[MOVE,WORK,CARRY,WORK],2:[MOVE,WORK,CARRY,WORK],3:[MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],4:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],5:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,CARRY],6:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY,CARRY],7:[MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,WORK,WORK,MOVE,CARRY,CARRY,MOVE,CARRY,CARRY],8:[WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,WORK,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE,CARRY,MOVE]},options:{role:"toad",resourceType:RESOURCE_ENERGY,builtcontainer:0,jobs:{construct:null,fix:null,sweep:null,mine:null,eat:null,upgrade:null}}}),Memory.emoji={frog:"🐸",construct:"🛠️️",deconstruct:"⛏",fix:"🏚️",mine:"💰",upgrade:"⚡",eat:"🍽️",deposit:"✨",collect:"✨",oops:"☠️",whack:"⚔️",pew:"🔫",aid:"💊",sweep:"✨",suicide:"💮",sogood:"✨🐸✨",hop:"💨"},Memory.costMatrix=new PathFinder.CostMatrix;var CM=Memory.costMatrix;module.exports.loop=function(){CM._bits.fill(255);for(var o in Memory.rooms){var e=Game.rooms[o];e&&(e.initializeMemory(),e.memory.roles={frog:0,newt:0,toad:0,squatter:0},e.memory.jobs={whack:[],construct:[],deconstruct:[],deposit:[],collect:[],aid:[],fix:[],sweep:[],mine:[],eat:[],upgrade:[]},e.memory.parentRoom?e.queueTasks(Game.rooms[e.memory.parentRoom]):e.queueTasks())}for(var t in Game.structures){var r=Game.structures[t];switch(r.structureType){case"tower":tower(r);break;case"spawn":Memory.spawns[r.name].queen&&queen(r)}}for(var s in Memory.creeps)if(Game.creeps[s]){if(Game.creeps[s]){var i=Game.creeps[s];switch(EXTENSION_ENERGY_CAPACITY[Game.rooms[i.memory.room].controller.level]*CONTROLLER_STRUCTURES.extension[Game.rooms[i.memory.room].controller.level]<=Game.rooms[i.memory.room].energyAvailable&&!0,i.ticksToLive<420&&(i.memory.hungry=!0),i.ticksToLive>1400&&(i.memory.hungry=!1),i.memory.room||(i.memory.room=i.name.split("_")[2]),i.memory.role){case"frog":i.say(i.frog());break;case"toad":i.say(i.toad());break;case"newt":i.say(i.newt());break;case"minnow":i.say(i.minnow())}}}else delete Memory.creeps[s]};