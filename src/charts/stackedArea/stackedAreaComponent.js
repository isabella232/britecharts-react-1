import React, {PureComponent} from 'react';
import stackedArea from './stackedAreaChart';


export default class StackedArea extends PureComponent {

    componentDidMount() {
        stackedArea.create(this._rootNode, {
            data: this.props.data,
        });
    }

    _setRef(componentNode) {
        if (componentNode) {
            this._rootNode = componentNode;
        }
    }

    render() {
        return (
            <div className="stacked-area-container" ref={this._setRef.bind(this)} />
        );
    }
}
