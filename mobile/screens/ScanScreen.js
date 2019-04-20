import React from 'react';
import {BarCodeScanner, Permissions} from 'expo';
import {Dimensions, LayoutAnimation, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";

export default class ScanScreen extends React.Component {
    state = {
        hasCameraPermission: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = () => {
        Permissions.askAsync(Permissions.CAMERA).then((res) => {
            this.setState({
                hasCameraPermission: res.status === 'granted',
            })
        })

    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.supplyId) {
            LayoutAnimation.spring();
            this.props.navigation.navigate('Supply', {id: result.data})
        }
    };

    render() {

        return (
            <View style={{
                flex: 1,
                backgroundColor: '#fff',
                borderColor: 'red',
                borderWidth: 1
            }}>
                {this.state.hasCameraPermission === null
                    ? <View style={styles.container}>
                        <Text>Requesting for camera permission</Text>
                    </View>
                    : this.state.hasCameraPermission === false
                        ? <View style={styles.container}>
                            <Text style={{marginBottom: 10}}>
                                Camera permission is not granted
                            </Text>
                            <Button title={"Get permissions to camera"} onPress={() => {
                                this._requestCameraPermission()
                            }}/>

                        </View>
                        : <BarCodeScanner
                            onBarCodeRead={this._handleBarCodeRead}
                            style={{
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width,
                            }}
                        />}
                <StatusBar hidden/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});