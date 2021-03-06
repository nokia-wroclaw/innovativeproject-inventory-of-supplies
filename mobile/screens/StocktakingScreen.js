import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getStocktaking, updateStocktaking } from "../services/StocktakingService";
import { CheckBox, ListItem, Icon } from "react-native-elements";


export default class StocktakingScreen extends React.Component {

    state = {
        stocktaking: null,
        results: [],
        pageSize: 8,
        count: 0,
        refreshing: false,
        page: 1
    };

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            payload => this._onRefresh(this.state.page)
        );
    }


    _onRefresh = (page) => {
        this.setState({ refreshing: true, page: page ? page : 1 });
        this.fetchData(page ? page : 1).then(() => {
            this.setState({ refreshing: false });
        });
    }


    async fetchData(page) {
        await getStocktaking(this.props.navigation.getParam("id"), {
            page: page,
            page_size: this.state.pageSize
        }).then((res) => {
            {
                page === 1 ?
                    this.setState({ ...this.state, ...res, page: 1 })
                    : this.setState({ ...this.state, ...res, results: [...this.state.results, ...res.results] })
            }
        })
    }

    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={styles.container}>
                <Icon
                    name="qrcode"
                    type='font-awesome'
                    size={40}
                    color="black"
                    onPress={() => {
                        this.props.navigation.navigate('StocktakingScanner', {
                            stockId: this.props.navigation.getParam("id"),
                        })
                    }}
                />
                <FlatList style={styles.container}
                    data={this.state.results}
                    keyExtractor={item => item.supply.id.toString()}
                    renderItem={({ item, index }) => <ListItem
                        style={styles.listItem}
                        title={<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text>
                                    {item.supply.name}
                                </Text>
                            </View>
                            <View style={{ width: 40 }}>
                                <CheckBox
                                    checked={item.is_checked}
                                    onPress={() => {
                                        const res = this.state.results
                                        console.log(index)
                                        res[index].is_checked = !(res[index].is_checked)
                                        updateStocktaking(this.props.navigation.getParam("id"), item.supply.id, (item.is_checked))
                                            .then(() => {
                                                this.setState({
                                                    ...this.state,
                                                    results: res
                                                })
                                            })
                                    }}
                                />
                            </View>
                        </View>}
                        subtitle={
                            <Text style={styles.subtitle}
                                ellipsizeMode={'tail'}
                                numberOfLines={1}
                            >{item.supply.description}</Text>
                        }
                    />}


                    onEndReached={() => {
                        if (this.state.page < this.state.count / this.state.pageSize) {
                            this._onRefresh(this.state.page + 1);
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={this.state.pageSize}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchbar: {
        flexDirection: 'row',
    },
    search: {
        maxWidth: 40
    },
    listItem: {
        borderBottomWidth: 1,
        borderColor: '#d0d0d0'
    },
    subtitle: {
        color: '#d0d0d0',

    },
});
