<template>
  <div
    class="absolute items-center justify-center w-full h-screen transition-all transform shadow-lg opacity-0 duration-400 bg-slate-600/80 alert"
  >
    <div class="flex flex-col max-w-lg bg-white rounded-md min-h-40 min-w-96">
      <div class="flex items-center justify-between shadow-md grow-0">
        <h3 class="ml-4 text-base font-semibold" id="alert_title">Alert</h3>
        <span
          class="flex items-center h-full pl-2 pr-4 cursor-pointer"
          id="alert_close"
        >
          <button class="py-2">&#10006;</button>
        </span>
      </div>
      <p class="p-4 grow" id="alert_message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
        aliquid placeat voluptatum ipsam officiis. Facilis, optio qui sit alias
        earum reiciendis. Facere animi, sed possimus repellendus laudantium odit
        fugiat vitae!
      </p>
      <div
        id="alert-info-actions"
        class="justify-center hidden px-4 pt-1 pb-3 grow-0 gap-x-4"
      >
        <button
          id="alert_ok"
          class="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 shadow-blue-950/10 focus:outline-none focus:ring focus:ring-gray-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-300"
          type="button"
        >
          Got, It
        </button>
      </div>

      <div
        id="alert-confirm-actions"
        class="flex justify-end px-4 pt-1 pb-3 grow-0 gap-x-4"
      >
        <button
          id="alert_cancel"
          class="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 shadow-blue-950/10 focus:outline-none focus:ring focus:ring-gray-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-gray-300"
          type="button"
        >
          Cancel
        </button>
        <button
          id="alert_confirm"
          class="px-4 py-2 text-sm font-medium text-white transition-colors duration-150 bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 shadow-blue-950/10 focus:outline-none focus:ring focus:ring-blue-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-300"
          type="button"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
