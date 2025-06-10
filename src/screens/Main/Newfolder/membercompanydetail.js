import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Modal, StyleSheet, Animated, Dimensions, FlatList, TouchableOpacity, ImageBackground, Linking, BackHandler, Platform } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Loading from '../../../components/Loader';
import { useRoute } from '@react-navigation/native';
import CustomHeader from '../../../components/CustomHeader';
const { width } = Dimensions.get("window");
import WhatsAppIcon from "../../../assets/Icon/whatsappIcon.svg";
import ContactIcon from '../../../assets/Icon/phoneIcon.svg';
import Location from "../../../assets/Icon/locationIcon.svg";
import LinearGradient from 'react-native-linear-gradient';
const MemberDirectoryTemplate = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);
    const [directorPhoto, setDirectorPhoto] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const flatListRef = useRef(null);
    const route = useRoute();
    const { companyData } = route.params || {};
    console.log(companyData, 'companyData');

    const getImageUri = (item) => {
        if (!item) return null;
        if (typeof item === 'string' && item.trim() !== '') return item;
        if (typeof item === 'object') {
            if (item.uri && typeof item.uri === 'string') return item.uri;
            if (item.image && typeof item.image === 'string') return item.image;
        }
        return null;
    };

    const handleImagePress = (image) => {
        const resolvedUri = getImageUri(image);
        if (resolvedUri) {
            setSelectedImage(resolvedUri);
            setIsModalVisible(true);
        } else {
            console.warn("Image URI not resolved.");
        }
    };
    const logoImage = { uri: companyData?.company_logo };
    const address1 = companyData?.address
    const name = companyData?.company_name
    const shortDescription = companyData?.short_description
    const categoryDetail = companyData?.type_of_jewellery?.join(', ')
    const phone = companyData?.contact
    const whatsAppNo = companyData?.whatsapp_number;
    const googleAddressLink = companyData?.google_map_link;
    const membershipId = companyData?.member_id?.membershipId;
    const removeDuplicates = (array) => [...new Set(array)];

    const galleryImages = removeDuplicates([
        ...(companyData?.slider_images || [])

    ]);
    const categoryImages = removeDuplicates([
        ...(companyData?.collection_photos || [])
    ]);

    useEffect(() => {
        if (!galleryImages || galleryImages.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                if (galleryImages.length === 0) return prevIndex;

                const nextIndex = (prevIndex + 1) % galleryImages.length;

                if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                }

                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [galleryImages.length]);

    useEffect(() => {
        if (!directorPhoto || directorPhoto.length === 0) return;
        let isMounted = true;
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => {
                if (!isMounted || directorPhoto.length === 0) return prevIndex;
                const nextIndex = (prevIndex + 1) % directorPhoto.length;
                if (flatListRef.current) {
                    flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
                }
                return nextIndex;
            });
        }, 3000);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [directorPhoto.length]);

    const renderDirectorImage = ({ item, index }) => {
        const uri = getImageUri(item);
        if (!uri) return null;

        return (
            <TouchableOpacity onPress={() => {
                setActiveIndex(index);
                handleImagePress(item);
            }}>
                <Image
                    source={{ uri }}
                    style={styles.directorImage}
                />
            </TouchableOpacity>
        );
    };

    const renderDots = () => {
        if (!galleryImages || galleryImages.length === 0) return null;
        return (
            <View style={styles.dotsContainer}>
                {galleryImages.map((_, index) => (
                    <View key={index} style={[styles.dotWrapper, { marginHorizontal: 4 }]}>
                        <View
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: activeIndex === index ? "#708090" : "#fff",
                                    width: activeIndex === index ? 20 : 8,
                                }
                            ]}
                        />
                    </View>
                ))}
            </View>
        );
    };
    const chunkImages = (images) => {
        let result = [];
        for (let i = 0; i < images.length; i += 3) {
            result.push(images.slice(i, i + 3));
        }
        return result;
    };
    const getImageWidth = (numImages) => {
        const margin = 10;
        const totalMargin = margin * (numImages + 1);
        return (width - totalMargin) / numImages;
    };
    useEffect(() => {
        const backAction = () => {
            if (isModalVisible) {
                setIsModalVisible(false);
                return true;
            }
            return false;
        };
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [isModalVisible]);
    const openLocationInMap = (mapUrl) => {
        if (!mapUrl) {
            Toast.show("Location URL not available.");
            return;
        }

        if (mapUrl.startsWith('http') || mapUrl.startsWith('https')) {

            Linking.openURL(mapUrl).catch((err) => {
                console.error("Failed to open map URL:", err);
                Toast.show("Unable to open location.");
            });
        } else {

            const geoUrl = Platform.OS === 'ios'
                ? `http://maps.apple.com/?q=${encodeURIComponent(mapUrl)}`
                : `geo:0,0?q=${encodeURIComponent(mapUrl)}`;

            Linking.canOpenURL(geoUrl)
                .then((supported) => {
                    if (supported) {
                        return Linking.openURL(geoUrl);
                    } else {

                        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapUrl)}`);
                    }
                })
                .catch((error) => {
                    console.error("Error opening map:", error);

                });
        }
    };
    const openWhatsApp = (number) => {
        let phoneNumber = number?.whatsAppNo
        let message = 'Hi';
        let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
            message,
        )}`;
        Linking.openURL(url).catch(() => {
            if (Platform.OS === 'ios') {
                Linking.openURL('https://apps.apple.com/us/search?term=WhatsApp');
            } else {
                Linking.openURL(
                    'https://play.google.com/store/apps/details?id=com.whatsapp',
                );
            }
        });
    };
    return (
        <>
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                        <Text style={styles.closeText}>X</Text>
                    </TouchableOpacity>
                    {selectedImage ? (
                        <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
                    ) : (
                        <Text>No image available</Text>
                    )}
                </View>
            </Modal>
            <CustomHeader
                title={"Company Details"}
                onPress={() => navigation.goBack()}
                onPress2={() => navigation.navigate("Notification")}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
                {loading || loading ? <Loading /> : null}

                <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: -10 }}>
                        <View style={styles.cardContent}>
                            <View style={styles.leftSection}>

                                <View style={styles.logoContainer}>
                                    {logoImage ? (
                                        <Image source={logoImage} style={styles.logo} />
                                    ) : (
                                        <Image source={{ uri: "https://via.placeholder.com/120" }} style={styles.logo} />
                                    )}
                                </View>
                                <View style={styles.addressContainer}>
                                    <Text style={[styles.highlightedDetail]}>
                                        {/* {address1} */}
                                        {address1.length > 15
                                            ? address1.substring(0, 15) + '...'
                                            : address1}
                                    </Text>
                                    {googleAddressLink && (
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, justifyContent: "flex-start" }}
                                            onPress={() => openLocationInMap(googleAddressLink)}
                                        >
                                            <Location width={20} height={25}
                                                style={{ marginRight: 2, marginLeft: -3 }} />
                                            <Text style={[styles.highlightedDetail1, { color: "#000", fontWeight: "bold", textDecorationLine: "underline", marginTop: 2, }]}>
                                                Locate Us
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                            <View style={styles.rightSection}>
                                <View style={styles.detailsSection}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: "flex-start",
                                        marginBottom: -5,
                                        width: '100%',
                                    }}>
                                        <View style={{ width: '70%', }}>
                                            {name && (
                                                <Text
                                                    style={[
                                                        styles.nameText,
                                                    ]}
                                                >
                                                    {name}
                                                </Text>
                                            )}
                                        </View>
                                        <LinearGradient
                                            colors={['#DDAC17', '#FFFA8A', '#ECC440']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={{ borderWidth: 0, width: '40%', alignItems: 'flex-end', paddingRight: 12, marginBottom: 20, backgroundColor: '#FFD700', padding: 5, marginLeft: 5, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>

                                            {membershipId !== '' && (

                                                <Text style={[styles.nameText1]}>
                                                    ID: {membershipId}
                                                </Text>
                                            )}
                                        </LinearGradient>
                                    </View>

                                    <View style={styles.centeredDetails}>
                                        {/* <Text style={styles.highlightedDetail}>{shortDescription}</Text> */}
                                        {/* <Text style={styles.highlightedDetail}>{categoryDetail}</Text> */}

                                        <Text style={styles.highlightedDetail}>
                                            {shortDescription.length > 50
                                                ? shortDescription.substring(0, 50) + '...'
                                                : shortDescription}
                                        </Text>
                                        <Text style={styles.highlightedDetail}>
                                            {categoryDetail.length > 50
                                                ? categoryDetail.substring(0, 50) + '...'
                                                : categoryDetail}
                                        </Text>
                                    </View>

                                    {phone && (
                                        <TouchableOpacity
                                            onPress={() => Linking.openURL(`tel:${phone}`)}
                                            style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5 }}
                                        >
                                            <ContactIcon width={20} height={20} fill="black"
                                                stroke="black"
                                                strokeWidth={1}
                                                style={{ marginRight: 5, marginLeft: -1 }} />
                                            <Text style={[styles.highlightedDetail1, { color: "#000", fontWeight: "bold", textDecorationLine: "underline", marginTop: 5, }]}>
                                                {phone}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                    {whatsAppNo && (
                                        <TouchableOpacity onPress={() => openWhatsApp(whatsAppNo)} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                                            <WhatsAppIcon width={17} height={18} style={{ marginRight: 5, marginLeft: -3 }} />
                                            <Text style={[styles.highlightedDetail1, { color: "#000", fontWeight: "bold", textDecorationLine: "underline", marginTop: 5, marginLeft: 1 }]}>
                                                {whatsAppNo}
                                            </Text>
                                        </TouchableOpacity>
                                    )}

                                </View>
                            </View>
                        </View>
                        <View style={styles.imageWrapper}>
                            <FlatList
                                ref={flatListRef}
                                data={galleryImages}
                                renderItem={renderDirectorImage}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                pagingEnabled={true}
                                snapToAlignment="center"
                                snapToInterval={width - 40}
                                decelerationRate="fast"
                                onScroll={(e) => {
                                    const contentOffsetX = e.nativeEvent.contentOffset.x;
                                    const index = Math.floor(contentOffsetX / (width - 40));
                                    setActiveIndex(index);
                                }}
                                initialScrollIndex={activeIndex}
                            />
                            {renderDots()}
                        </View>
                        <View style={styles.categoryImages}>
                            {chunkImages(categoryImages).map((chunk, idx) => (
                                <View key={`row-${idx}`} style={styles.row}>

                                    {chunk.map((uri, index) => {
                                        const imageUri = getImageUri(uri);
                                        if (!imageUri) return null;

                                        const imageWidth = getImageWidth(3);
                                        const imageLabel = uri?.name || "";
                                        return (
                                            <View>
                                                <TouchableOpacity key={`category-${idx}-${index}`} onPress={() => handleImagePress(uri)}>
                                                    <Image

                                                        source={{ uri: imageUri }}
                                                        style={[styles.categoryImage, { width: imageWidth, marginHorizontal: 3 }]}
                                                    />
                                                </TouchableOpacity>
                                                <Text style={styles.imageLabel}>
                                                    {/* {imageLabel} */}
                                                    {imageLabel.length > 15
                                                        ? imageLabel.substring(0, 15) + '...'
                                                        : imageLabel}
                                                </Text>
                                            </View>
                                        );
                                    })}
                                    {chunk.length < 3 &&
                                        Array.from({ length: 3 - chunk.length }).map((_, placeholderIdx) => (
                                            <View
                                                key={`placeholder-${idx}-${placeholderIdx}`}
                                                style={{
                                                    width: getImageWidth(3),
                                                    marginHorizontal: 3,
                                                    height: 100,
                                                    backgroundColor: "transparent",
                                                }}
                                            />
                                        ))}
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    card: {
        position: 'relative',
        borderRadius: 20,
        marginBottom: 10,
        padding: 15,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 220,
    },
    cardContent: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    leftSection: {
        marginTop: 10,
        flex: 0.32,
        alignItems: 'center',
        marginRight: 20,
    },
    rightSection: {
        paddingRight: 10,
        marginTop: 10,
        flex: 0.65,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginLeft: -20,
    },
    logoContainer: {
        marginBottom: 2,
        marginTop: -4,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // resizeMode: 'contain',
        resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
        borderWidth: 2,
        borderColor: '#FFD700',
        backgroundColor: '#FFF',
        elevation: 15,
    },
    nameText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '600',
        textAlign: 'left',
        marginBottom: 5
    },
    nameText1: {
        fontSize: 11,
        color: '#000000',
        fontWeight: '600',
        marginRight: -5,
        alignSelf: 'center'
    },
    detailsSection: {
        paddingHorizontal: 5,
        marginRight: -5,
    },
    highlightedDetail: {
        minHeight: 15,
        fontSize: 11.5,
        marginBottom: 5,
        color: '#000000',
        fontWeight: '500'
    },
    highlightedDetail1: {
        marginTop: -10,
        fontSize: 11.5,
        marginBottom: 5,
    },
    phoneText: {
        textAlign: 'left',
        fontSize: 20,
        marginTop: -5,
    },
    imageWrapper: {
        flexDirection: 'column',
        padding: 8,
    },
    directorImage: {
        width: width - 35,
        height: 180,
        marginHorizontal: 6,
        borderWidth: 1,
        // resizeMode: 'contain',
        resizeMode: Platform.OS === 'ios' ? 'contain' : 'contain',
        borderRadius: 15,
        // backgroundColor: '#fff',
        elevation: 10,
        shadowRadius: 8,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        position: 'relative',
    },
    dotWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    activeDot: {
        backgroundColor: 'black',
    },
    categoryImages: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: -5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    categoryImage: {
        height: 100,
        // resizeMode: 'contain',
        resizeMode: Platform.OS === 'ios' ? 'cover' : 'contain',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    imageLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#000',
        textAlign: "center",
        marginBottom: 8
    },
    centeredDetails: {
        textAlign: 'left',
        marginBottom: 5,
    },
    editIconContainer: {
        position: 'absolute',
        right: 10,
        top: 5,
        padding: 5,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
    },
    fullImage: {
        width: "90%",
        height: "80%",
    },
    closeButton: {
        position: "absolute",
        top: 55,
        right: 35,
        width: width * 0.08,
        height: width * 0.08,
        backgroundColor: "red",
        borderRadius: (width * 0.08) / 2,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    closeText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
    },
});
export default MemberDirectoryTemplate;
