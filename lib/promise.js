//Protoype to hack the Promise.all to avoid stop when a error happen.
Promise.Complete = r => Promise.all(r.map(p => p.catch ? p.catch(e => e) : p));