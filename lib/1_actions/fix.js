/* jshint -W008 */
//// REPAIR PLUS
Creep.prototype.fix = function() {
  if (this.memory.tasks.fix) {
    switch (this.repair(Game.getObjectById(this.memory.tasks.fix))) {
      case 0:
        return Memory.emoji.fix;
      case - 9:
        if (!this.fixAura()) {
          //set move
          
          this.moveTo(Game.getObjectById(this.memory.tasks.fix), {
            visualizePathStyle: {
              fill: 'transparent',
              stroke: '#ffaaaa',
              lineStyle: 'solid',
              strokeWidth: .15,
              opacity: .5
            }
          });
          return Memory.emoji.fix;
        }
        return Memory.emoji.sogood;
    }
  }
  return Memory.emoji.oops + Memory.emoji.fix + Memory.emoji.oops;
};
