'use client';

import { useState, useEffect } from 'react';

const PushNotificationSubscriber = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker.ready.then(registration => {
                registration.pushManager.getSubscription().then(subscription => {
                    setIsSubscribed(!!subscription);
                });
            });
        }
    }, []);

    const subscribeUser = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: 'YOUR_PUBLIC_VAPID_KEY_HERE'
                });

                // TODO: Send the subscription to your server
                console.log('User is subscribed:', subscription);
                setIsSubscribed(true);
            } catch (error) {
                console.error('Failed to subscribe the user: ', error);
            }
        }
    };

    const unsubscribeUser = async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                const subscription = await registration.pushManager.getSubscription();
                if (subscription) {
                    await subscription.unsubscribe();
                    // TODO: Inform your server about the unsubscription
                    console.log('User is unsubscribed');
                    setIsSubscribed(false);
                }
            } catch (error) {
                console.error('Error unsubscribing', error);
            }
        }
    };

    return (
        <div>
            {isSubscribed ? (
                <button onClick={unsubscribeUser}>Unsubscribe from Push Notifications</button>
            ) : (
                <button onClick={subscribeUser}>Subscribe to Push Notifications</button>
            )}
        </div>
    );
};

export default PushNotificationSubscriber;
