export class Colors
{
     private colors : Array<any> = [
        { id: 1, name: "White" },
        { id: 2, name: "Silver" },
        { id: 3, name: "Black" },
        { id: 4, name: "Grey" },
        { id: 5, name: "Red" },
        { id: 6, name: "Blue" },
        { id: 7, name: "Green" },
        { id: 8, name: "Yellow" },
        { id: 9, name: "Gold" },
        { id: 10, name: "Brown" }   
      ];

      findColor(myId : number) : string
      {
          if(myId)
            return this.colors.find(x => x.id === myId).name.toLowerCase();
      }
} 