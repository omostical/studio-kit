import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bell, Settings } from "lucide-react";
import { Avatar } from "../Avatar/Avatar";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Tabs/Tabs";
import {
  Notifications,
  NotificationsTrigger,
  NotificationsContent,
  NotificationsHeader,
  NotificationsToolbar,
  NotificationList,
  NotificationItem,
  NotificationGroupLabel,
  NotificationsFooter,
} from "./Notifications";

const meta: Meta<typeof NotificationItem> = {
  title: "Components/Notifications",
  component: NotificationItem,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof NotificationItem>;

/** Template 1: bell trigger with the unread count in its name, regular tabs, grouped list. */
export const Panel: Story = {
  render: () => (
    <Notifications>
      <NotificationsTrigger asChild>
        <IconButton appearance="border" icon={<Bell />} aria-label="Notifications, 1 unread" />
      </NotificationsTrigger>
      <NotificationsContent>
        <Tabs size="small" defaultValue="all" className="gap-gap-0">
          <NotificationsHeader action={<Button size="small" variant="secondary" appearance="ghost">Mark all as read</Button>} />
          <NotificationsToolbar>
            <TabsList divider={false}>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
            <IconButton size="small" icon={<Settings />} aria-label="Notification settings" />
          </NotificationsToolbar>
          <TabsContent value="all" className="min-h-0 overflow-y-auto">
            <NotificationList>
              <NotificationItem unread href="#" avatar={<Avatar size="small" name="Studio Kit" alt="" />} title={<><strong>Studio Kit</strong> launched a new feature in Projects</>} time="Just now" />
              <NotificationItem href="#" avatar={<Avatar size="small" name="Darya Lee" alt="" />} title={<><strong>Darya Lee</strong> sent a message</>} time="13 min ago" content="Hi all, sharing the diagram we talked about." />
              <NotificationGroupLabel>March</NotificationGroupLabel>
              <NotificationItem href="#" avatar={<Avatar size="small" name="Ralph Ito" alt="" />} title={<><strong>Ralph Ito</strong> asked to update the shift</>} time="Mar 4"
                actions={<><Button size="xsmall">Accept</Button><Button size="xsmall" variant="secondary" appearance="border">Decline</Button></>} />
            </NotificationList>
          </TabsContent>
          <TabsContent value="unread">
            <NotificationList>
              <NotificationItem unread href="#" avatar={<Avatar size="small" name="Studio Kit" alt="" />} title={<><strong>Studio Kit</strong> launched a new feature in Projects</>} time="Just now" />
            </NotificationList>
          </TabsContent>
          <NotificationsFooter><Button size="small" variant="secondary" appearance="ghost">Show more</Button></NotificationsFooter>
        </Tabs>
      </NotificationsContent>
    </Notifications>
  ),
};
