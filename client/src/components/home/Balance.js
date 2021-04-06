import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Balance() {
    return (
            
        <div>
                <section className="row">
                    <div className="card text-white mb-3">
                        <div className="card-header bg-purple">
                            <h3>
                                Account Balance
                            </h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text text-dark">
                                <h1 className="text-center">
                                    $ 5
                                </h1>
                            </p>
                        </div>
                    </div>
                </section> 
                  
                <hr></hr>            
        </div>
    )
}
