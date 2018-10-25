#include <stdio.h>

void test() {
	int a = 1;
	int b = 2;
	int c = 3;
	
	int *pb = &b;

	*(pb + 1) = 7;
	*(pb - 1) = 8;

	printf("%d\n", a);
	printf("%d\n", b);
	printf("%d\n", c);
}

int main() {
	test();
}
