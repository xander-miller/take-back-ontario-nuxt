<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="bg-tboBlue"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <img
              class="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            >
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <SiteHeaderLink
                v-for="item in navigation"
                :key="item.name"
                :name="item.name"
                :href="item.href"
                :current="item.current"
              />
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div
            v-if="!user"
            class="hidden sm:ml-6 sm:block"
          >
            <div class="flex space-x-4">
              <SiteHeaderLink
                href="/profile?signIn"
                :aria-current="undefined"
                name="Sign In"
                :current="false"
              />
            </div>
          </div>
          <div
            v-if="!user"
            class="hidden sm:ml-6 sm:block"
          >
            <div class="flex space-x-4">
              <SiteHeaderLink
                href="/welcome"
                name="Sign Up"
              />
            </div>
          </div>


          <!-- Profile dropdown -->
          <Menu
            v-if="user"
            as="div"
            class="relative ml-3"
          >
            <div>
              <MenuButton
                class="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>

                <Bars3Icon class="h-8 w-8 rounded-full" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="/profile"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                  >Your
                    Profile</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
                    @click.prevent="signOut"
                  >Sign out</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton
          v-for=" item in navigation "
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-vue';
import SiteHeaderLink from './SiteHeaderLink.vue';
const {user, signOut} = toRefs(useAuthenticator());
const navigation = [
  { name: 'Learn More', href: '/about', current: true },
  { name: 'Events', href: '/events', current: false },
  { name: 'Resources', href: '/resources', current: false },
]
</script>