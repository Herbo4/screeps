StructureTower.prototype.report = function() {
    this.room.visual.circle(this.pos,
    {fill: 'transparent', radius: 5, stroke: 'red'});
  if (this.room.controller.my) {
    if (this.energy < this.energyCapacity) {
      Memory.rooms[this.room.name].newt.deposit.push(this.id);
      Memory.rooms[this.room.name].toad.deposit.push(this.id);
    }
    if (this.hits < this.hitsMax) {
      Memory.rooms[this.room.name].frog.fix.push(this.id);
      Memory.rooms[this.room.name].tower.fix.push(this.id);
    }
  } else {
    if (this.energy > 0) {

      Memory.rooms[this.room.name].newt.collect.push(this.id);

    } else {

      Memory.rooms[this.room.name].frog.deconstruct.push(this.id);

    }
  }
};
