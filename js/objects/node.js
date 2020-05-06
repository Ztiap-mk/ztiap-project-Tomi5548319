class Node {
    constructor() {
        // Observers to notify (nodes)
        this.nodes = [];

        this.id = "default"; // Used for targetting specific nodes
    }

    // Add an observer (node)
    add(node) {
        this.nodes.push(node);
    }

    // Remove an observer (node)
    remove(node) {
        for(var obj of this.nodes)
            if(node === obj){
                var index = this.nodes.indexOf(node);
                this.nodes.splice(index, 1);
            } else if(obj.nodes.length > 0)
                obj.remove(node);

    }

    // Notify observers (nodes) of an event
    notify(event, argument) {
        for (var index in this.nodes) {
            var node = this.nodes[index];
            if (typeof (node) != "undefined")
                if (typeof (node[event]) == "function")
                    node[event](argument);
        }
    }
}