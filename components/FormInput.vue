<template>
  <div class="md:flex flex-col">
    <div>
      <label
        class="
          block
          text-gray-500
          font-bold
          md:text-left
          pb-2"
        :for="id"
      >
        {{ label }}
      </label>
    </div>
    <div class="grow">
      <input
        :id="id"
        v-model="inputValue"
        :name="name"
        :class="errorClass"
        class="bg-gray-200
          text-gray-700
          border-gray-200
            appearance-none
            border-2
            active:bg-sk-200
            rounded
            py-2
            px-4
            leading-tight 
            focus:outline-none
          focus:bg-white
          focus:border-tboblue
            w-full"
        :type="type"
        @blur="handleBlur"
      >
    </div>
    <div class="h-7">
      <p class="text-tbored italic text-xs mb-1 mt-1">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmits, ref, defineProps, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue', 'blur']);

const inputValue = ref(props.modelValue);

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue);
});

const handleBlur = () => {
  emit('blur', props.name);
};

const errorClass = computed(() => {
  return props.error ? 'border-tbored' : '';
});

watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal;
});
</script>
